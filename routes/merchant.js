
const express = require("express");
const data = require("../data");
const {ObjectId} = require("mongodb");
const router = express.Router();
const foodData = data.food;

router.get('/myfood/:id', async (req, res) => {
    //res.render("posts/foodList");


    if (!req.session.user) {
        return res.send("没登录");

    }

    if (req.session.user.type!=="merchant") {
        return res.send("你不是merchant");
    }

    if (req.session.user.id!==req.params.id) {
        return res.send("别看别人的");
    }

        console.log("没有参数")
        const itemsArray = await foodData.getAllFood();
        res.render("merchant/myfood", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:{foodCategoryHelper:"ALL"}});




    //res.send("posts/foodList");
});

router.get('/login', async (req, res) => {




    res.render("posts/login");


});




module.exports = router;
