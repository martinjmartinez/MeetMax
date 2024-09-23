const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Dummy data for attendees
const attendees = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Middleware for JSON body parsing
app.use(express.json());

// API route
app.get('/attendees', (req, res) => {
  res.json(attendees);
});

// Correctly export the handler
module.exports.handler = serverless(app);
