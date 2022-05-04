const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;
const uuid = require('uuid/v4');
const {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 10;

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}





const exportedMethods = {

 


  async findUserByUsername(username) {


    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    return user;

  },

  async createUser(username, password) {

    if (!username) throw 'You must provide a user name';
    if (typeof username !== 'string') throw 'User name must be a string';
    if (username.trim() == '') throw 'User name with empty spaces are not valid';
    if (username.length < 4) throw 'User name must longer than 4 characters'

    if (!password) throw 'You must provide a password';
    if (typeof password !== 'string') throw 'Password must be a string';
    if (password.trim() == '') throw 'Password with spaces are not valid';
    if (password.includes(" ")) throw 'Password with spaces are not valid';
    if (password.length < 6) throw 'Password must longer than 6 characters';


    const userCollection = await users();

    const hashedPassword = await bcrypt.hash(username, saltRounds);



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

  async createMerchant(username, password,restaurantName) {

    if (!username) throw 'You must provide a user name';
    if (typeof username !== 'string') throw 'User name must be a string';
    if (username.trim() == '') throw 'User name with empty spaces are not valid';
    if (username.length < 4) throw 'User name must longer than 4 characters'

    if (!password) throw 'You must provide a password';
    if (typeof password !== 'string') throw 'Password must be a string';
    if (password.trim() == '') throw 'Password with spaces are not valid';
    if (password.includes(" ")) throw 'Password with spaces are not valid';
    if (password.length < 6) throw 'Password must longer than 6 characters';

    if (!restaurantName) throw 'You must provide a restaurant name';
    if (typeof restaurantName !== 'string') throw 'Restaurant name must be a string';
    if (restaurantName.trim() == '') throw 'User name with empty spaces are not valid';
    


    const userCollection = await users();

    const hashedPassword = await bcrypt.hash(username, saltRounds);



    if (await this.findUserByUsername(username)!== null) {
      throw 'you can not use this account';

    }else{

      const newUserInfo = {
        username: username,
        password: hashedPassword,
        type: "merchant",
        restaurantName:restaurantName
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

    // if (!image) throw 'You must provide a image';
    // if (typeof image !== 'string') throw 'Image name must be a string';

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
      // image: image,
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

  async createOrder(userId, name, price, quantity, total, image) {

    if (!userId) throw 'You must provide a user id';
    if (typeof userId !== 'string') throw 'User id must be a string';

    if (!name) throw 'You must provide a name';
    if (typeof name !== 'string') throw 'Name must be a string';

    if (!price) throw 'You must provide a price';
    //todo 数字检测

    if (!quantity) throw 'You must provide a quantity';
    //todo 数字检测

    if (!total) throw 'You must provide a total';
    //todo 数字检测

    if (!image) throw 'You must provide a image';
    if (typeof image !== 'string') throw 'Image name must be a string';

    let time = formatDate(new Date());

    const userCollection = await users();

    const newOrderInfo = 

      {
        orderId: uuid(),
        name: name,
        price: price,
        quantity: quantity,
        total: total,
        image: image,
        // 2021-10-24 16:21:23 (yyyy-mm-dd hh:mm:ss)
        time: time
      }
    
    ;

    id = ObjectId(userId);

    const updatedInfo = await userCollection.updateOne(
      { _id: id },
      { $push: {order: newOrderInfo} }

    );

    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update band successfully';
    }

    const user = await userCollection.findOne({ _id: id });
    user._id = user._id.toString();

    return user;

  },


  async update(id, name, password, image, mobileNumber, zipCode, description) {
    if (!id) throw 'You must supply an ID';
    if (typeof id != "string") throw 'The type of id should be string';

    if (!name) throw 'You must provide a name';
    if (typeof name !== 'string') throw 'Name must be a string';
    if (name.trim() == '') throw 'Name with empty spaces are not valid';
    if (name.length < 4) throw 'Name must longer than 4 characters'

    if (!password) throw 'You must provide a password';
    if (typeof password !== 'string') throw 'Password must be a string';
    if (password.trim() == '') throw 'Password with spaces are not valid';
    if (password.includes(" ")) throw 'Password with spaces are not valid';
    if (password.length < 6) throw 'Password must longer than 6 characters';

    if (!image) throw 'You must provide a image';
    if (typeof image !== 'string') throw 'Image name must be a string';

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

    const updateduser = {
      name: name,
      password: password,
      image: image,
      mobileNumber: mobileNumber,
      zipCode: zipCode,
      description: description
    };

    id = ObjectId(id);

    const updatedInfo = await userCollection.updateOne(
      { _id: id },
      { $set: updateduser}

    );

    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update band successfully';
    }

    const user = await userCollection.findOne({ _id: id });
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

    const user = await userCollection.findOne({username: username});

    if(!user){
      throw 'check your account and password';

    }

    const res=await bcrypt.compare(password, user.password);


    if (res){
      return user;



    }else{
      throw 'check your account and password';


    }
  }, 

  async getAllPosts() {
    const postCollection = await customers();
    return await postCollection.find({}).toArray();
  },

  async getUserById(id) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof id =="string") throw 'ID must be a string'

    id = ObjectId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (user === null) throw 'No user with that id';
    user._id = user._id.toString();

    return user;
  }



};


module.exports = exportedMethods;
