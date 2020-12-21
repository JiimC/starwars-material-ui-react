/******************************************************************************************************************
*
* server/index.js
* Created by: Rob O
*
* Configures global middleware.
* If more global middleware is needed in the future than add it to module.exports below (following same convention)
* Values below are pretty much the defaults
*
*****************************************************************************************************************/

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require('method-override');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
}

