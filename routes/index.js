const userRoutes = require('./users');
const path = require('path');
const data = require('../data');
const mongoCollections = require("../config/mongoCollections");
const customerData = data.customers;
const merchantData = data.merchant;
const foodData = data.food;
const express = require("express");

const router = express.Router();




const constructorMethod = (app) => {
  //app.use('/customer', customerRoutes);
  app.use('/users', userRoutes);
  app.get('/', (req, res) => {
    res.render("posts/index");
  });

  // app.get('/foodList/:id', async(req, res) => {
  //   const itemsArray = [await foodData.getFoodByName(req.params.id)];
  //   res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});
  //
  // });



  app.get('/foodList', async (req, res) => {
    //res.render("posts/foodList");

    console.log(req.query);

    if (JSON.stringify(req.query ) === '{}') {
      console.log("没有参数")
      const itemsArray = [await foodData.getAllFood()];
      res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});


    }else{
      console.log("有参数")
      const itemsArray = [await foodData.getFoodByFilter()];
      res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});

    }


    //res.send("posts/foodList");
  });



  app.get('/foodDetail/:id', async (req, res) => {
    //res.render("posts/foodList");


      res.render("posts/foodDetail");





  });


  //todo 缺少食物的主人才可以编辑的验证
  app.post("/foodEdit/:id", async (req, res) => {

    let foodName = req.body.foodName;
    let foodPrice = parseInt(req.body.foodPrice);
    let foodDes = req.body.foodDes;
    let filename;


    if (req.file) {
      filename = "/public/uploads/" + req.file.filename;
    }

    console.log(filename);
    if (!foodName || !foodPrice || !foodDes || !filename) {
      //todo 不全的错误提示
      res.render("layouts/form_item", {
        pageTitle: "Create a new item!",
        name: name,
        categories: categories,
        description: description,
        price: price,
        payment: payment,
        zip: geo,
        minDays: time.minDays,
        maxDays: time.maxDays,
        error: "Please complete all fields"
      });
      return;
    }

    await merchantData.addMerchant(foodName, foodPrice, foodDes, filename);


  });




  // app.post('/foodEdit/:id', async (req, res) => {
  //   //res.render("posts/foodList");
  //
  // });

  app.get('/foodEdit/:id', async (req, res) => {
    //res.render("posts/foodList");


    res.render("posts/foodEdit");





  });


  // app.use('*', (req, res) => {
  //   res.redirect('/posts');
  // });
};

module.exports = constructorMethod;
