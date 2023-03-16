const express = require('express');
const routerAnalytics = express.Router();
const pool = require('../database'); //Connects to the database




  // adds request information to the database
  routerAnalytics.post('/send', async (req, res) => {

    try {

        const satcheck = `SELECT EXISTS(SELECT 1 FROM "satellite" WHERE name = '${req.body['sat']}');
        `;

        const satcheckdata = await pool.query(
            satcheck
          );


          if (!satcheckdata['rows'][0]['exists']) {
            const satquery = `INSERT INTO "satellite" ( "name") VALUES ('${req.body['sat']}');`
            const satquerydata = await pool.query(
                satquery
              );
    
            // console.log(satquerydata);
            
          }

          satid = `SELECT "satID" FROM satellite WHERE name = '${req.body['sat']}';`

          const satiddata = await pool.query(
            satid
          );

          
          const satrequestcheck = `SELECT EXISTS(SELECT 1 FROM "satRequest" WHERE "satID" = '${satiddata['rows'][0]['satID']}');
          `;


          const satrequestcheckdata = await pool.query(
            satrequestcheck
          );

        //   console.log('grwgwrg', satrequestcheckdata);


          const query = `INSERT INTO "satRequest" ("userID", "satID", "lastAltitude", "lastLocation", "lastOrbitalSpeed", "lastOrbitalPeriod", "lastPositionVector", "groundStationDist", "dateRecorded") VALUES (13, ${satiddata['rows'][0]['satID']}, ${req.body['altitude']}, '${req.body['location']}', '${req.body['velocity']}', '${req.body['period']}', '${req.body['position']}', ${req.body['distance']}, '${req.body['time']}');`

          if (!satcheckdata['rows'][0]['exists']) {
            const queryData = await pool.query(
                    query
                  );
            
          } 
      

        
    } catch (error) {
        console.error(error)
        
    }
    
  });


  // gets request information from the database
  routerAnalytics.get('/get', async (req, res) => {
    const satRequestRes = await pool.query(
        'SELECT * FROM "satRequest"'
      );
      const sat = await pool.query(
        'SELECT * FROM satellite'
      );

      console.log(satRequestRes['rows']);

      res.send({requests: satRequestRes['rows'], sat: sat['rows']});
   
  });




module.exports = routerAnalytics