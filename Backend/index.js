const path = require('path');
require('dotenv').config({ path: path.join(path.join(__dirname, '..'), '.env') }); //The .env fiel will be in the "Web-App folder"
const cors = require('cors');
const express = require('express');
const app = express();
const outputURL = require('./Helper-Functions/OutputURL');


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


// Routes
app.get('/', (req, res) => {
  //res.send('Hello World!')
  const name = 'Colin';
  res.render('index.ejs', { name });
})



// Listens to a specific port number 
// and displays the port number
app.listen(PORT, () => {
  const time = new Date().toLocaleTimeString();
  
    console.log(`Server started on port ${PORT}` + ' at ' + time)
});