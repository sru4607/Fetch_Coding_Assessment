// Holds all the point data
const data = {

};

// Gets specified users points
const getUser = (req, res) => {
  if (req.query.user === '' || data[req.query.user] == undefined) {
    return res.status(400).json({ error: 'No User Found' });
  }
  const output = {};
  // Sum Up the current points for each payer
  data[req.query.user].transactions.forEach((transaction) => {
    if (output[transaction.payer] === undefined) {
      output[transaction.payer] = transaction.points;
    } else {
      output[transaction.payer] += transaction.points;
    }
  });

  // Remove any negative balances
  Object.keys(output).forEach((payer) => {
    if (output[payer] < 0) {
      delete output[payer];
    }
  });

  return res.status(200).json({ data: output });
};

// Add transaction
const addPoints = (req, res) => {
  const user = req.query.user;
  const payer = req.query.payer;
  const points = parseInt(req.query.points, 10);
  const transactionDate = req.query.transactionDate;

  var date = transactionDate.split(" ");
  if(date.length != 3){
    return res.status(400).json({error: "Invalid Date"});
  }

  // Initialize new user
  if (data[user] == undefined) {
    data[user] = {};
    data[user].transactions = [];
  }

  // Add Transaction
  data[user].transactions.push({
    payer,
    points,
    date: transactionDate,
  });

  // Sort by date
  data[user].transactions.sort((a, b) => {
    //Compare Date
    var aDateTime = a.date.split(" ");
    var aMonthDay = aDateTime[0].split("/");
    var bDateTime = b.date.split(" ");
    var bMonthDay = bDateTime[0].split("/");  
    
    if(aMonthDay[0] !== bMonthDay[0]){
      return aMonthDay[0] - bMonthDay[0];
    }
    if(aMonthDay[1] !== bMonthDay[1]){
      return aMonthDay[1] - bMonthDay[1];
    }
    if(aDateTime[2] !== bDateTime[2]){
      return aDateTime[2].localeCompare(bDateTime[2]);
    }
    return aDateTime[1].localeCompare(bDateTime[1]);
  });

  return res.status(200).json({ status: 'Success', user: data[user] });
};


//Deduct Points based on request
const deductPoints = (req, res) => {
  //If user does not exist
  if (req.query.user === '' || data[req.query.user] === undefined) {
    return res.status(400).json({ error: 'No User Found' });
  }


  const user = req.query.user;
  let pointsToDeduct = req.query.points;

  //Check total points against request
  let totalPoints = 0;
  data[req.query.user].transactions.forEach((transaction) => {
    totalPoints += transaction.points;
  });

  //If not enough points send error
  if (totalPoints < pointsToDeduct) {
    return res.status(400).json({ status: 'Not Enough Points', user: data[user] });
  }

  //Deduct points as needed
  for (let i = 0; i < data[user].transactions.length && pointsToDeduct > 0; i++) {
    pointsToDeduct -= data[user].transactions[i].points;
    data[user].transactions[i].points = 0;
    if (pointsToDeduct < 0) {
      data[user].transactions[i].points -= pointsToDeduct;
      pointsToDeduct = 0;
    }
  }

  return res.status(200).json({ status: 'Success', user: data[user] });
};

module.exports = {
  getUser,
  addPoints,
  deductPoints,
};
