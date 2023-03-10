const express = require('express');
const router = express.Router();



//Validates login onformation
router.post('/', async (req, res) => {

    console.log(req.body);
    res.send({v: 'yes'});
  });




  module.exports = router;
  