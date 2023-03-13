//Require statements

const path = require('path');
require('dotenv').config({ path: path.join(path.join(__dirname, '..'), '.env') }); //The .env file will be in the "Web-App folder"
const cors = require('cors');
const express = require('express');
const app = express();
const outputURL = require('./Helper-Functions/OutputURL');
const pool = require('./database'); //Connects to the database
const bodyParser = require('body-parser')
const fs = require('fs');





// Uses port number that is given in an
// env file or port 5000 otherwise
const PORT = process.env.PORTBACKEND || 5000;


// Sets the view engine to ejs
app.set('view engine', 'ejs');


// Outputs the type of  request,
// endpoint, and time of the request
app.use(outputURL);


// Middleware that will be used
app.use(cors()); //Allows requests from various origins to be handled 
app.use(express.json({ limit: '100mb' })) //creates a req.body that can be handled easily. The 10 mb limit is to not include large requests
app.use(express.urlencoded({ extended: false })); //Allows us to parse data from forms
app.use(bodyParser.json());




// Routes
app.get('/', async (req, res) => {
  //res.send('Hello World!')
  const name = 'User to the backend';
  res.render('index.ejs', { name });
});


// // Displays the information in the database
// app.get('/database', async (req, res) => {

//   try {
    
//     const satelliteRes = await pool.query(
//       'SELECT * FROM satellite'
//     );

//     const usersRes = await pool.query(
//       'SELECT * FROM users'
//     );

//     const satRequestRes = await pool.query(
//       'SELECT * FROM "satRequest"'
//     );

//     const locationRequestRes = await pool.query(
//       'SELECT * FROM "locationRequest"'
//     );

//     //console.log('sqlResponse:' + JSON.stringify(sqlResponse.rows));
    
//     res.render('db.ejs', {satelliteRes, usersRes, satRequestRes, locationRequestRes});
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// // Resets and displays the information in the database
// app.post('/database', async (req, res) => {

//   try {

//     //Deletes data from the database
//     const deleteQuery = `
//     DELETE FROM satellite;
//     DELETE FROM users;
//     DELETE FROM "satRequest";
//     DELETE FROM "locationRequest";
//     `;
//     const deleteData = await pool.query(
//       deleteQuery
//     );

//     //Resets data in the database
//     const resetQuery = `
//     INSERT INTO satellite ("satID", name) VALUES (5, 'telesat5');

//     INSERT INTO users ("userID", username, password, "accessRights", admin, approved, "loggedIn") VALUES (13, 'colincrasta', 'colin1306', '1:2:3', true, true, false);

//     INSERT INTO users ("userID", username, password, "accessRights", admin, approved, "loggedIn") VALUES (10, 'testing', 'testing', '1:2:3', false, false, false);

//     INSERT INTO "satRequest" ("satRequestID", "userID", "satID", "lastAltitude", "lastLocation", "lastOrbitalSpeed", "lastOrbitalPeriod", "lastPositionVector", "dateRecorded") VALUES (2, 13, 5, 25000, '0:0', 100, 65, '0:0:0', '12:45:13 am');

//     INSERT INTO "locationRequest" ("locationRequestID", "userID", location, "lastTemp", "lastPrecipitationAmount", "lastHumidity", "lastPressure", "lastSNR", "lastBER", "lastScheme", "dateRecorded") VALUES (3, 13, '0:0', 40, 5, 13, 3000, 2, 3, 'n/a', '11:25:56 pm');

    
//     `;
//     const resetData = await pool.query(
//       resetQuery
//     );



    
//     const satelliteRes = await pool.query(
//       'SELECT * FROM satellite'
//     );
//     const usersRes = await pool.query(
//       'SELECT * FROM users'
//     );
//     const satRequestRes = await pool.query(
//       'SELECT * FROM "satRequest"'
//     );
//     const locationRequestRes = await pool.query(
//       'SELECT * FROM "locationRequest"'
//     );

    
//     res.render('db.ejs', {satelliteRes, usersRes, satRequestRes, locationRequestRes});
//   } catch (error) {
//     console.log(error.message);
//   }
// });


// // Deletes the information in the database
// app.post('/databased', async (req, res) => {

//   try {

//     //Deletes data from the database
//     const deleteQuery = `
//     DELETE FROM "satRequest";
//     DELETE FROM "locationRequest";
//     DELETE FROM satellite;
//     DELETE FROM users;
//     `;
//     const deleteData = await pool.query(
//       deleteQuery
//     );

    
//     const satelliteRes = await pool.query(
//       'SELECT * FROM satellite'
//     );
//     const usersRes = await pool.query(
//       'SELECT * FROM users'
//     );
//     const satRequestRes = await pool.query(
//       'SELECT * FROM "satRequest"'
//     );
//     const locationRequestRes = await pool.query(
//       'SELECT * FROM "locationRequest"'
//     );

    
//     res.render('db.ejs', {satelliteRes, usersRes, satRequestRes, locationRequestRes});
//   } catch (error) {
//     console.log(error.message);
//   }
// });



app.get('/file', async (req, res) => {

  try {

    fs.readFile('data.txt', 'utf-8', (err, data) => {
      if (err) throw err;
    
      res.send( {file: data});
    });
  } catch (error) {
    console.log(error.message);
  }
});





//Routers
app.use('/login', require('./Routes/Login'));
app.use('/database', require('./Routes/DB.js'));
app.use('/database/d', require('./Routes/DB.js'));



// Listens to a specific port number 
// and displays the port number
app.listen(PORT, () => {
  const time = new Date().toLocaleTimeString();
  
    console.log(`Server started on port ${PORT}` + ' at ' + time)
});