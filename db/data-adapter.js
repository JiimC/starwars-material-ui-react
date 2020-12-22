const mongoose = require('mongoose');
const models = require('./schemas/model');
const _ = require('lodash');

exports.model = {};

const sleep = ( interval ) => {
  return new Promise((resolve, reject)=>{
    setTimeout( interval || 1000, ()=>{
      resolve(true);
    })
  })
}

exports.createConnection = async ( mongoose ) => {
  try {
    let connection = process.env.MDB_CONNECTION ? process.env.MDB_CONNECTION : 'mongodb://root:example@localhost:27017/starwars';
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
    console.log(`Connected to ${ connection }`);
  } catch (err) {
    console.log('error...');
    throw (err);
  }
}

// index

exports.indexResource = async (resource) => {
  let persisted = _.cloneDeep(resource);
  let indexed;
  let local_model;

  if (!this.model['apimap']) {
    this.model['apimap'] = models.getModel['apimap'](mongoose);
  }

  local_model = this.model['apimap'];

  if (
    persisted &&
    persisted.url &&
    persisted._id
  ) {
    let map = {
      url: persisted.url,
      refid: persisted['_id']
    };
    let doc = local_model(map);
    await doc.save();
  } else {
    throw new Error(`Parameters not supplied, unable to index`);
  }
  return indexed;
}


// create

exports.createResource = async (resource) => {
  try {
    // console.log( 'connection state: ' + mongoose.connection.readyState )
    while( mongoose.connection.readyState !== 1 ){
      console.log( mongoose.connection.readyState );
      await sleep(1000);
    }

    let local_model;
    let resourceObj = _.cloneDeep(resource);
    if (
      resourceObj &&
      !resourceObj.resourceType
    ) {
      throw new Error(`resourceType not supplied`);
    }
    if (!this.model[resourceObj.resourceType]) {
      this.model[resourceObj.resourceType] = models.getModel[resourceObj.resourceType](mongoose);
    }
    local_model = this.model[resourceObj.resourceType];
    let doc = local_model(resourceObj);
    await doc.save();
    console.log(`Created ${JSON.stringify(doc)}`);
    await this.indexResource(doc);
    return doc;
  } catch (err) {
    throw (err);
  }
}

// search
exports.findById = async (queryObj) => {
  try {
    let local_model;
    let query = _.cloneDeep(queryObj);
    if (
      query &&
      !query.resourceType
    ) {
      throw new Error(`resourceType not supplied for query`);
    }
    console.log( query );
    if (!this.model[query.resourceType]) {
      this.model[query.resourceType] = models.getModel[query.resourceType](mongoose);
    }
    local_model = this.model[query.resourceType];
    let results = await local_model.findOne(query).exec();
    return results;
  } catch (err) {
    throw (err);
  }
}

exports.findOne = async (queryObj) => {
  try {
    let local_model;
    let query = _.cloneDeep(queryObj);
    if (
      query &&
      !query.resourceType
    ) {
      throw new Error(`resourceType not supplied for query`);
    }
    if (!this.model[query.resourceType]) {
      this.model[query.resourceType] = models.getModel[query.resourceType]();
    }
    local_model = this.model[query.resourceType];
    let result = await local_model.findOne(query).exec();
    return result;
  } catch (err) {
    throw (err);
  }
}

exports.getCollectionCount = async ( queryObj ) => {
  try {
    let local_model;
    let query = _.cloneDeep(queryObj);
    if (
      query &&
      !query.resourceType
    ) {
      throw new Error(`resourceType not supplied for query`);
    }
    if (!this.model[query.resourceType]) {
      this.model[query.resourceType] = models.getModel[query.resourceType]();
    }
    local_model = this.model[query.resourceType];
    let result = await local_model.countDocuments( { resourceType: query.resourceType } ).exec();
    return ({resourceType: query.resourceType, count: result});
  } catch (err) {
    throw (err);
  }
}

// search

// update

// delete

// disconnect


this.createConnection( mongoose )
  .catch(err => {
    console.log(err)
  })


