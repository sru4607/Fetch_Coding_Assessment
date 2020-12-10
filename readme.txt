ReadMe

How to run:

Using the Command Prompt open the directory

Using node in the Command prompt run the command npm install
Wait for it to install necessary dependencies

Using node in the Command prompt run the command npm start (Have port 3000 open)

Use the following commands to interact with the webservice

For getting information about a user:
http://127:0.0.1:3000/getUser?user={user} 

For adding points to a user:
(Date must be in month/date time format Ex. 10/31 9 AM)
(Points must be an integer)
http://127.0.0.1:3000/addPoints?user={user}&payer={payer}&points={points}&transactionDate={date}

For deducting points from a user:
(Points must be an integer)
http://127.0.0.1:3000/addPoints?user={user}&points={points}






