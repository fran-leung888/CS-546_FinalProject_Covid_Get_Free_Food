const mongoCollections = require('../config/mongoCollections');
const customers = mongoCollections.posts;
const uuid = require('uuid/v4');

const exportedMethods = {
  async getAllPosts() {
    const postCollection = await customers();
    return await postCollection.find({}).toArray();
  }

};

module.exports = exportedMethods;
