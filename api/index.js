/******************************************************************************************************************
*
* server/api/index.js
* Created by: Rob O
*
* Router that mounts API routes
*
*****************************************************************************************************************/

var router = require('express').Router();
var routes = require('./mongo/routes');

router.use('/mongo', routes);

module.exports = router;