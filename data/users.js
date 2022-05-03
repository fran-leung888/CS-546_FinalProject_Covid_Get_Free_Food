const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const uuid = require('uuid/v4');
const {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const exportedMethods = {



  async findUserByUsername(username) {


    const userCollection = await users();
    const user = await userCollection.findOne({ account: username });
    return user;

  },

  async createUser(username, password) {


    const userCollection = await users();

    const hashedPassword = await bcrypt.hash(password, saltRounds);



    if (await this.findUserByUsername(username)!== null) {
      throw 'you can not use this account';

    }else{

      const newUserInfo = {
        username: username,
        password: hashedPassword,
        type: "user"
      };

      const insertInfo = await userCollection.insertOne(newUserInfo);
      if (insertInfo.insertedCount === 0) throw 'Could not add user';

      let newId = insertInfo.insertedId;

      const user = await userCollection.findOne({ _id: newId });
      user._id = user._id.toString();

      return user._id;
    }



  },

  async create(name, password, mobileNumber,zipCode, description) {

    if (!name) throw 'You must provide a name';
    if (typeof name !== 'string') throw 'Name must be a string';
    if (name.trim() == '') throw 'Name with empty spaces are not valid';
    if (name.length < 4) throw 'Name must longer than 4 characters'

    if (!password) throw 'You must provide a password';
    if (typeof password !== 'string') throw 'Password must be a string';
    if (password.trim() == '') throw 'Password with spaces are not valid';
    if (password.includes(" ")) throw 'Password with spaces are not valid';
    if (password.length < 6) throw 'Password must longer than 6 characters';

    if (!mobileNumber) throw 'You must provide a mobileNumber';
    if (typeof mobileNumber !== 'string') throw 'mobileNumber must be a string';
    if (mobileNumber.trim() == '') throw 'mobileNumber with spaces are not valid';
    if (mobileNumber.includes(" ")) throw 'mobileNumber with spaces are not valid';
    if (mobileNumber.length > 13) throw 'mobileNumber must be less than 14 characters';

    if (!zipCode) throw 'You must provide a zipCode';
    if (typeof zipCode !== 'string') throw 'ZipCode must be a string';
    if (zipCode.trim() == '') throw 'ZipCode with spaces are not valid';
    if (zipCode.includes(" ")) throw 'ZipCode with spaces are not valid';
    if (zipCode.length != 5) throw 'ZipCode must be 5 characters';

    if (!description) throw 'You must provide a description';
    if (typeof description !== 'string') throw 'Description must be a string';

    const userCollection = await users();

    const newUserInfo = {
      name: name,
      password: password,
      mobileNumber: mobileNumber,
      zipCode: zipCode,
      description: description
    };

    const insertInfo = await userCollection.insertOne(newUserInfo);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    let newId = insertInfo.insertedId;
    
    const user = await userCollection.findOne({ _id: newId });
    user._id = user._id.toString();

    return user;

  },

  async checkUser(username, password) {
    if (!username) return {authenticated: false};
    if (typeof username !== 'string') return {authenticated: false};
    if (username.trim() == '') return {authenticated: false};
    if (username.includes(" ")) return {userInserted: false};
    if (username.length < 4) return {authenticated: false};
    
    
    if (!password) return {authenticated: false};
    if (typeof password !== 'string') return {authenticated: false};
    if (password.trim() == '') return {authenticated: false};
    if (password.includes(" ")) return {userInserted: false};
    if (password.length < 6) return {authenticated: false};
  
    const userCollection = await users();


    const user = await userCollection.findOne({username: username,password:password});
    
    if (user == null){

      throw 'check your account and password';


    }else{

      return user;
    
    }
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
