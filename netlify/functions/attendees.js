const serverless = require('serverless-http');
const express = require('express');
const app = express();

const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
import fetch from 'node-fetch';


// Dummy data for attendees
const attendees = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Middleware for JSON body parsing
app.use(express.json());

// API route
app.get('/.netlify/functions/attendees', async (req, res) => {
    // Set up OAuth using consumer key and secret only (no token)
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
    url: 'https://www.meetmax.com/sched/service/attendee/list?data_type=XML&event_id=111863', // Replace with the actual OAuth 1.0 endpoint
    method: 'GET',
  };

  try {
    // Make the request using only the consumer credentials (no token)
    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data)),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
    //   body: JSON.stringify(data),
      body: data,

    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

    // res.json(attendees);
  });

// Correctly export the handler
module.exports.handler = serverless(app);
