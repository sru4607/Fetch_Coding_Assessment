// import libraries
const express = require('express');

// Set port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Pull in our routes
const router = require('./router.js');

// Use Express and set up the session
const app = express();


// Set up the router
router(app);

// Listen on port and write to console
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
