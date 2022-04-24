const customerRoutes = require('./users');
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

  // app.use('*', (req, res) => {
  //   res.redirect('/posts');
  // });
};

module.exports = constructorMethod;
