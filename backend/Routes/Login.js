const express = require("express");
const router = express.Router();
const pool = require("../database"); //Connects to the database
const hasher = require("crypto-js"); //Hashing library

//Validates login onformation
router.post("/", async (req, res) => {
  const username = [req.body.username];
  const hash = hasher.SHA256(req.body.password).toString();

  const queryUser = "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)";
  const queryPW = "SELECT EXISTS(SELECT 1 FROM users WHERE password = $1)";

  const outputUser = await pool.query(queryUser, username);
  const outputPW = await pool.query(queryPW, [hash]);

  let userApproved = false;

  if (outputUser.rows[0]["exists"]) {
    const queryApproved = "SELECT approved FROM users WHERE username = $1";
    const outputApproved = await pool.query(queryApproved, username);
    console.log(outputApproved);
    if (outputApproved.rows[0]["approved"]) {
      userApproved = true;
    } else {
      userApproved = false;
    }
  }

  const result = [outputUser.rows[0]["exists"], outputPW.rows[0]["exists"]];

  let approved = false;
  let incorrect; //returns whether username, password, or both are incorrect

  if (result[0] && result[1]) {
    approved = true;
    incorrect = "none";
  } else if (result[0] && !result[1]) {
    incorrect = "password";
  } else if (!result[0] && result[1]) {
    incorrect = "username";
  } else if (!result[0] && !result[1]) {
    incorrect = "both";
  }

  console.log(req.body);
  res.send({
    approved: approved,
    incorrect: incorrect,
    userApproved: userApproved,
  });
});

router.post("/register", async (req, res) => {
  const username = [req.body.username];
  const hash = hasher.SHA256(req.body.password).toString();

  const query = `INSERT INTO users (username, password, admin, approved, "loggedIn") VALUES ('${username}', '${hash}', false, false, false);`;

  const data = await pool.query(query);

  res.send({ inserted: true });
});

module.exports = router;
