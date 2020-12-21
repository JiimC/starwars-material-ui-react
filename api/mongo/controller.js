let db = require('../../db/data-adapter.js');

exports.getResourceByTypeAndId = function (req, res) {
  if (!req.params ||
    (
      !req.params.type ||
      !req.params.id
    )
  ) {
    throw new Error(`Unexpected input to function, type and id required as object params`);
  }
  console.log(req.params);
  let query = {};
  query.resourceType = req.params.type;
  query['api_id'] = req.params.id;
  return db.findById(query)
    .then(response => {
      console.log(JSON.stringify(response));
      response = response ? response : undefined
      if (!response) {
        throw ('not found');
      }
      res.send(response);
    })
    .catch(err => {
      res.status(404).send(err);
    })
}

