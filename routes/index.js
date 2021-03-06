const userRoutes = require('./user');
const foodRoutes = require('./food');
const merchantRoutes = require('./merchant');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const path = require('path');
const data = require('../data');
const mongoCollections = require("../config/mongoCollections");
const merchantData = data.merchant;
const foodData = data.food;
const express = require("express");

const router = express.Router();

const categoryData = data.category;



const constructorMethod = (app) => {
  //app.use('/customer', customerRoutes);
  app.use('/user', userRoutes);
  app.use('/food', foodRoutes);
  app.use('/merchant', merchantRoutes);
  app.use('/signup', signupRoutes);
  app.use('/login', loginRoutes);
  app.use('/logout', logoutRoutes);
  app.get('/', (req, res) => {
    res.render("home/index", {
      helpers: {
        whichLinks: () => 'head/home-links'
      },
      categories: categoryData.getAll()
    });
  });

  app.use("*", (_, res) => {
    res.status(404).json({ error: "Not found" });
  });





  // app.get('/foodList/:id', async(req, res) => {
  //   const itemsArray = [await foodData.getFoodByName(req.params.id)];
  //   res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});
  //
  // });















  // app.post('/foodEdit/:id', async (req, res) => {
  //   //res.render("posts/foodList");
  //
  // });




  // app.use('*', (req, res) => {
  //   res.redirect('/posts');
  // });
};

module.exports = constructorMethod;
