//const path = require('path');
//require('dotenv').config({ path: '../.env' }); //The .env file will be in the "Web-App folder"

//Import statement for the pg library
const Pool = require("pg").Pool;


const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'webapp',
    // password: 'colin1306',
    // port: 5432
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.DATABASE,
    password: process.env.PASSWORDDB,
    port: process.env.PORTDB
  });


  module.exports = pool;