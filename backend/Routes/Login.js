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
    // console.log(outputApproved);
    if (outputApproved.rows[0]["approved"]) {
      userApproved = true;
    } else {
      userApproved = false;
    }
  }

  let isAdmin = false;

  if (outputUser.rows[0]["exists"]) {
    const queryAdmin = `SELECT admin FROM users WHERE username = $1;`;
    const outputAdmin = await pool.query(queryAdmin, [req.body.username]);
    console.log(outputAdmin);
    if (outputAdmin.rows[0]["admin"]) {
      isAdmin = true;
    } else {
      isAdmin = false;
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

  // console.log(req.body);
  res.send({
    approved: approved,
    incorrect: incorrect,
    userApproved: userApproved,
    isAdmin: isAdmin,
  });
});

router.post("/register", async (req, res) => {
  const username = [req.body.username];
  const hash = hasher.SHA256(req.body.password).toString();

  const query = `INSERT INTO users (username, password, admin, approved, "loggedIn") VALUES ('${username}', '${hash}', false, false, false);`;

  const data = await pool.query(query);

  res.send({ inserted: true });
});

//Gets the user information about if they are approved and their admin status
router.post("/getusers", async (req, res) => {
  const queryInfo = "SELECT * FROM users";

  const outputInfo = await pool.query(queryInfo);
  // console.log(outputInfo["rows"]);

  res.send({
    userInfo: outputInfo["rows"],
  });
});

//Onverts the user into an admin
router.post("/adminuser", async (req, res) => {
  const query = `UPDATE users SET admin = $1 WHERE username = $2;`;
  console.log(req.body.admin, req.body.username);
  const data = await pool.query(query, [req.body.admin, req.body.username]);
});

//Approves the user
router.post("/approveuser", async (req, res) => {
  const query = `UPDATE users SET approved = $1 WHERE username = $2;`;
  console.log(req.body.approved, req.body.username);
  const data = await pool.query(query, [req.body.approved, req.body.username]);
});

//Checks if the user is an administrator
router.post("/isadmin", async (req, res) => {
  const query = `SELECT admin FROM users WHERE username = $1;`;
  console.log(req.body.username);
  const data = await pool.query(query, [req.body.username]);
  // console.log(data["rows"]["approved"], "vyyfifif");
});

module.exports = router;
