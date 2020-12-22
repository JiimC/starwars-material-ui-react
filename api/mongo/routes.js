/******************************************************************************************************************
*
* server/api/smsp/index.js
* Created by: Ian C
*
* SMSP routes
*
*****************************************************************************************************************/

const router = require('express').Router();
const controller = require('./controller');

router.route('/collection')
  .get( controller.getResourceCount )

router.route('/resource')
  .get( controller.getResourceByTypeAndId )

module.exports = router;