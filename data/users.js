const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const uuid = require('uuid/v4');
const {ObjectId} = require('mongodb');


const exportedMethods = {
  
  async create(name) {
    if (!name) throw 'You must provide a name';
    // if (!genre) throw 'You must provide a genre';
    // if (!website) throw 'You must provide a website';
    // if (!recordLabel) throw 'You must provide a recordLabel';
    // if (!bandMembers) throw 'You must provide a bandMembers';
    // if (!yearFormed) throw 'You must provide a yearFormed';

    if (typeof name !== 'string') throw 'Name must be a string';
    if (name.trim() == '') throw 'Name with empty spaces are not valid';
    // if (genre instanceof Array == false) throw 'Gener must be a Array ';
    // if (genre.length < 1) throw 'Gener must include one element';
    // for(let x of genre){
    //     if(typeof x != 'string'){
    //         throw 'The element of gener is not string';
    //     }
    // }
    // if (typeof website !== 'string') throw 'Website must be a string';
    // if (website.trim() == '') throw 'Website with empty spaces are not valid';
    // if (!website.includes('http://www.')) throw 'Website must have http://www.';
    // if (!website.endsWith('.com')) throw 'Website must ends with .com';
    // if (website.length < 20) throw 'Website lack characters in-between the http://www. and .com';
    // if (typeof recordLabel !== 'string') throw 'RecordLabel must be a string';
    // if (recordLabel.trim() == '') throw 'RecordLabel with empty spaces are not valid';
    // if (bandMembers instanceof Array == false) throw 'BandMembers must be a Array ';
    // if (bandMembers.length < 1) throw 'BandMembers must include one element';
    // for(let x of bandMembers){
    //     if(typeof x != 'string'){
    //         throw 'The element of bandMembers is not string';
    //     }
    // }
    // if (typeof yearFormed !== 'number') throw 'YearFormed must be a string';
    // if (yearFormed < 1900 || yearFormed > 2022) throw 'YearFormed is not between 1900 and 2022';
    
    const userCollection = await users();

    const newUserInfo = {
      name: name,
      // genre: genre,
      // website: website,
      // recordLabel: recordLabel,
      // bandMembers: bandMembers,
      // yearFormed: yearFormed,
      // albums: [],
      // overallRating: 0
    };

    const insertInfo = await userCollection.insertOne(newUserInfo);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    let newId = insertInfo.insertedId;
    
    const user = await userCollection.findOne({ _id: newId });
    user._id = user._id.toString();

    return user;

  },

  async getAllPosts() {
    const postCollection = await customers();
    return await postCollection.find({}).toArray();
  },

  async getUserById(id) {

    // if (!id) throw 'You must provide an id to search for';
    // if (typeof id != "string") throw 'The type of id should be string';
    id = ObjectId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (user === null) throw 'No user with that id';
    user._id = user._id.toString();

    return user;
  }



};




module.exports = exportedMethods;
