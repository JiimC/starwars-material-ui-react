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

router.route('/:type/:id')
  .get( controller.getResourceByTypeAndId )

module.exports = router;