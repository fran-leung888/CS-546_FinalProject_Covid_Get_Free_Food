const customerRoutes = require('./customer');
const path = require('path');
const data = require('../data');
const customerData = data.customers;
const foodData = data.food;



const constructorMethod = (app) => {
  //app.use('/customer', customerRoutes);
  //app.use('/users', userRoutes);
  app.get('/', (req, res) => {
    res.render("posts/index");
  });

  app.get('/foodList/:id', async(req, res) => {
    const itemsArray = [await foodData.getFoodByName(req.params.id)];
    res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});

  });

  app.get('/foodList', async (req, res) => {
    //res.render("posts/foodList");

    console.log(req.query);
    //todo 遍历一下参数
    for ( queryElement in res.query) {
      console.log(queryElement);
    }
    const itemsArray = [await foodData.getAllFood()];
    res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});

    //res.send("posts/foodList");
  });

  // app.use('*', (req, res) => {
  //   res.redirect('/posts');
  // });
};

module.exports = constructorMethod;
