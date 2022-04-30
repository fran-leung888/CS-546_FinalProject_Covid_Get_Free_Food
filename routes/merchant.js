
const express = require("express");
const data = require("../data");
const {ObjectId} = require("mongodb");
const router = express.Router();
const foodData = data.food;

router.get('/list', async (req, res) => {
    //res.render("posts/foodList");

    console.log(req.query);

    if (JSON.stringify(req.query ) === '{}') {
        console.log("没有参数")
        const itemsArray = await foodData.getAllFood();
        res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:{foodCategoryHelper:"ALL"}});


    }else{
        console.log("有参数")
        const itemsArray = await foodData.getFoodByFilter(req.query);
        req.query.foodCategoryHelper="->"
        res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:req.query});

    }


    //res.send("posts/foodList");
});

router.get('/login', async (req, res) => {




    res.render("posts/login");


});


router.get('/testLogin', async (req, res) => {


    const newVar = await foodData.getFood("626459d091c540f91323d112");

    req.session.user ={id:"1",name:"nidie"}

    console.log(1);

    res.render("posts/foodList");


});


module.exports = router;
