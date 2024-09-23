const serverless = require('serverless-http');
const express = require('express');
const app = express();

const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const fetch = require('node-fetch');

// Middleware for JSON body parsing
app.use(express.json());

// API route
app.get('/.netlify/functions/attendees', async (req, res) => {
  const oauth = OAuth({
    consumer: {
      key: 'igapi',  // Your consumer key
      secret: 'MeetMax12!',  // Your consumer secret
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    },
  });

  const request_data = {
    url: 'https://www.meetmax.com/sched/service/attendee/list?data_type=XML&event_id=111863',
    method: 'GET',
  };

  try {
    console.log('Starting request...');

    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data)),
      },
    });

    console.log('Response received');

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const xmlData = await response.text();
    console.log('Data retrieved:', xmlData);

    // Send the response back to the client
    res.status(200).send(xmlData);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }
});

// Correctly export the handler
module.exports.handler = serverless(app);
