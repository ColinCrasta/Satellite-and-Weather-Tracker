const express = require('express');
const router = express.Router();
const pool = require('../database'); //Connects to the database
const hasher = require('crypto-js'); //Hashing library



//Validates login onformation
router.post('/', async (req, res) => {

  const username = [req.body.username];
  const hash = hasher.SHA256(req.body.password).toString();


  const queryUser = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
  const queryPW = 'SELECT EXISTS(SELECT 1 FROM users WHERE password = $1)';

  const outputUser = await pool.query(queryUser, username);
  const outputPW = await pool.query(queryPW, [hash]);
  
const result = [outputUser.rows[0]['exists'], outputPW.rows[0]['exists']];

 

  let approved;

  if (result[0] && result[1]) {
    approved = true;
  } else {
    approved = false
  }

 

    console.log(req.body);
    res.send({approved: approved});
  });




  module.exports = router;
  