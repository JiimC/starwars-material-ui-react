let db = require('../../db/data-adapter.js');

exports.getResourceByTypeAndId = function (req, res) {
  if (!req.query ||
    (
      !req.query.type ||
      !req.query.id
    )
  ) {
    throw new Error(`Unexpected input to function, type and id required as object params`);
  }
  console.log(req.query);
  let query = {};
  query.resourceType = req.query.type;
  query['api_id'] = req.query.id;
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

exports.getResourceCount = function (req, res) {
  if (!req.query ||
    (
      !req.query.type 
    )
  ) {
    throw new Error(`Unexpected input to function, type required as object query`);
  }
  console.log(req.query);
  let query = {};
  query.resourceType = req.query.type;
  return db.getCollectionCount(query)
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

