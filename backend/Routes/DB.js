const express = require("express");
const routerDB = express.Router();
const pool = require("../database"); //Connects to the database

// Displays the information in the database
routerDB.get("/", async (req, res) => {
  try {
    const satelliteRes = await pool.query("SELECT * FROM satellite");

    const usersRes = await pool.query("SELECT * FROM users");

    const satRequestRes = await pool.query('SELECT * FROM "satRequest"');

    const locationRequestRes = await pool.query(
      'SELECT * FROM "locationRequest"'
    );

    //console.log('sqlResponse:' + JSON.stringify(sqlResponse.rows));

    res.render("db.ejs", {
      satelliteRes,
      usersRes,
      satRequestRes,
      locationRequestRes,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Resets and displays the information in the database
routerDB.post("/", async (req, res) => {
  try {
    //Deletes data from the database
    const deleteQuery = `
      DELETE FROM "satRequest";
      DELETE FROM "locationRequest";
      DELETE FROM satellite;
      DELETE FROM users;
      `;
    const deleteData = await pool.query(deleteQuery);

    //Resets data in the database
    const resetQuery = `
      INSERT INTO satellite ("satID", name) VALUES (5, 'telesat5');
  
      INSERT INTO users ("userID", username, password, admin, approved, "loggedIn") VALUES (13, 'colin1234', '9966a3a51ae99da7b6e06df0b8919a06b62b5cab7f475bdb5478dbe97efbbb14', true, true, false);
  
      INSERT INTO users ("userID", username, password, admin, approved, "loggedIn") VALUES (10, 'testing', 'a683c5c5349f6f7fb903ba8a9e7e55d0ba1b8f03579f95be83f4954c33e81098', false, true, false);
  
      INSERT INTO "satRequest" ("satRequestID", "userID", "satID", "lastAltitude", "lastLocation", "lastOrbitalSpeed", "lastOrbitalPeriod", "lastPositionVector", "groundStationDist", "dateRecorded") VALUES (2, 13, 5, 2500, '-62:27', '[-2.669373    2.72457286 -6.82410132]', '100', '[-5533.71185589 2465.19466632 2500]', 14949, '2023:03:15:12:50:13' );
  
      INSERT INTO "locationRequest" ("locationRequestID", "userID", location, "lastTemp", "lastHumidity", "lastPressure", "lastSNR", "lastBER", "lastScheme", "lastBandwidth", "lastCapacity", "dateRecorded") VALUES (3, 13, '0:0', 40, 13, 3000, 2, 3, 'n/a', 3, 1, '11:25:56');
      `;

    const resetData = await pool.query(resetQuery);

    const satelliteRes = await pool.query("SELECT * FROM satellite");
    const usersRes = await pool.query("SELECT * FROM users");
    const satRequestRes = await pool.query('SELECT * FROM "satRequest"');
    const locationRequestRes = await pool.query(
      'SELECT * FROM "locationRequest"'
    );

    res.render("db.ejs", {
      satelliteRes,
      usersRes,
      satRequestRes,
      locationRequestRes,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Deletes the information in the database
routerDB.post("/d", async (req, res) => {
  try {
    //Deletes data from the database
    const deleteQuery = `
      DELETE FROM "satRequest";
      DELETE FROM "locationRequest";
      DELETE FROM satellite;
      DELETE FROM users;
      `;
    const deleteData = await pool.query(deleteQuery);

    const satelliteRes = await pool.query("SELECT * FROM satellite");
    const usersRes = await pool.query("SELECT * FROM users");
    const satRequestRes = await pool.query('SELECT * FROM "satRequest"');
    const locationRequestRes = await pool.query(
      'SELECT * FROM "locationRequest"'
    );

    res.render("db.ejs", {
      satelliteRes,
      usersRes,
      satRequestRes,
      locationRequestRes,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = routerDB;
