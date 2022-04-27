const express = require("express");
const data = require("../data");
const router = express.Router();
const foodData = data.food;



router.get('/edit/:id', async (req, res) => {
    //res.render("posts/foodList");


    res.render("posts/foodEdit");




});


router.get('/detail/:id', async (req, res) => {
    //res.render("posts/foodList");
    //todo 渲染详情
    const food = await foodData.getFood(req.params.id);

    res.render("posts/foodDetail",{foodName:food.foodName,price:food.price,foodDes:food.foodDes,filename:food.filename});



});


//todo 缺少食物的主人才可以编辑的验证
router.post("/edit/:id", async (req, res) => {

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

    const newVar = await foodData.addFood(foodName, foodPrice, foodDes, filename);
    console.log(newVar._id.toString());

    res.redirect("/food/Detail/"+newVar._id.toString());



});

module.exports = router;
