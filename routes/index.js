const customerRoutes = require('./customer');
const path = require('path');

const constructorMethod = (app) => {
  //app.use('/customer', customerRoutes);
  //app.use('/users', userRoutes);
  app.get('/', (req, res) => {
    res.render("posts/index");
  });

  app.get('/foodList', (req, res) => {
    //res.render("posts/foodList");

    let itemsArray=[[{
      "_id": "e4464231-9981-4cde-8d09-94bfb632128b",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "rice cooker",
      "categories": [
        "home",
        "appliances"
      ],
      "description": "a handy machine to cook rice without burning it",
      "price": 10,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/ricecooker.jpg",
      "time": {
        "minDays": 0.5,
        "maxDays": 2
      },
      "rentals": [],
      "status": "available"
    },{
      "_id": "e4464231-9981-4cde-8d09-94bfb632128b",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "rice cooker",
      "categories": [
        "home",
        "appliances"
      ],
      "description": "a handy machine to cook rice without burning it",
      "price": 10,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/ricecooker.jpg",
      "time": {
        "minDays": 0.5,
        "maxDays": 2
      },
      "rentals": [],
      "status": "available"
    },{
      "_id": "e4464231-9981-4cde-8d09-94bfb632128b",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "rice cooker",
      "categories": [
        "home",
        "appliances"
      ],
      "description": "a handy machine to cook rice without burning it",
      "price": 10,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/ricecooker.jpg",
      "time": {
        "minDays": 0.5,
        "maxDays": 2
      },
      "rentals": [],
      "status": "available"
    },{
      "_id": "e4464231-9981-4cde-8d09-94bfb632128b",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "rice cooker",
      "categories": [
        "home",
        "appliances"
      ],
      "description": "a handy machine to cook rice without burning it",
      "price": 10,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/ricecooker.jpg",
      "time": {
        "minDays": 0.5,
        "maxDays": 2
      },
      "rentals": [],
      "status": "available"
    },{
      "_id": "e4464231-9981-4cde-8d09-94bfb632128b",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "rice cooker",
      "categories": [
        "home",
        "appliances"
      ],
      "description": "a handy machine to cook rice without burning it",
      "price": 10,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/ricecooker.jpg",
      "time": {
        "minDays": 0.5,
        "maxDays": 2
      },
      "rentals": [],
      "status": "available"
    },{
      "_id": "67846b29-6aba-416f-9fae-4c2df00c4488",
      "userProfile": {
        "username": "clararamos",
        "firstName": "Clara",
        "lastName": "Ramos",
        "email": "cramos1@stevens.edu",
        "phone": "123-456-7809",
        "zip": "07030",
        "_id": "282ec7b5-ebf3-4fef-8ba2-8ea5d1775c9f"
      },
      "name": "Wii U",
      "categories": [
        "appliances",
        "video_games",
        "electronics"
      ],
      "description": "A Nintendo Wii U",
      "price": 30,
      "paymentMethod": "cash",
      "zip": "07030",
      "imagePath": "/public/uploads/wiiu.png",
      "time": {
        "minDays": 1,
        "maxDays": 10
      },
      "rentals": [],
      "status": "available"
    }]];


    res.render("posts/foodList", { pageTitle: "List of All Items", itemsArray: itemsArray });

    //res.send("posts/foodList");
  });

  app.use('*', (req, res) => {
    res.redirect('/posts');
  });
};

module.exports = constructorMethod;
