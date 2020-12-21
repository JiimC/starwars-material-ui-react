const express = require('express');
const app = express();
const api = require('./api');
var addMiddleWare = require('./middleware');

//Setup/add app's global middleware
addMiddleWare(app);

//Setup API
app.use('/v1/api', api);

//Setup global error handling
app.use(function(err, req, res, next) {
  //If JWT is invalid
  if(err.name && err.name.toLowerCase() === 'unauthorizederror') {
      //Return 401 (unauth)
      err = errors.unauthorised();
  }
  //If err is not an error object then return errors.serverError (catch all)
  if(!err.type) {
      err = errors.serverError(err.stack || err)
  }
  logger.error(err);
  //Return
  res.status(err.status.code).json(err);
});

var listener = app.listen(8001, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

//Export app
module.exports = app;
