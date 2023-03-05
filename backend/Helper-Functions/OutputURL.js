// Outputs the request type and
// endpoint of the request
const outputURL = (req, res, next) => {


  console.log(''); //Line break

  console.log('Request Type : Endpoint');


  const requestType = req.method;

  const route = req.originalUrl;



  console.log(requestType + ' : ' + route);

  //Allows the next function to be completed
  next();
};



module.exports = outputURL;