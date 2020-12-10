const main = require('./main.js');

const router = (app) => {
  // When just checking current points
  app.get('/getUser', main.getUser);
  app.get('/addPoints', main.addPoints);
  app.get('/deductPoints', main.deductPoints);
};

module.exports = router;
