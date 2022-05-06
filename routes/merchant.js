
const express = require("express");
const data = require("../data");
const {ObjectId} = require("mongodb");
const router = express.Router();
const foodData = data.food;
const userData = data.users;
const merchantData = data.merchant;



router.get('/list', async (req, res) => {
    //res.render("posts/foodList");

    console.log(req.query);


    const itemsArray = await merchantData.getAllMerchant();
    res.render("posts/merchantList", { itemsArray: itemsArray});





    //res.send("posts/foodList");
});








router.get('/detail/:id', async (req, res) => {


    //todo 先验证是不是真merchant
    let merchant
    try {
        merchant = await userData.getUserById(req.params.id);

    }catch (e) {
        return res.redirect("/merchant/list")

    }
    if(!merchant||merchant.type!=="merchant"){
        return res.redirect("/merchant/list")
    }





    const itemsArray = await foodData.getFoodByMerchant(req.params.id);


    return res.render("posts/merchantDetail",{restaurantName:merchant.restaurantName,description:merchant.description
        ,filename:merchant.filename,phone:merchant.phone,address:merchant.address,itemsArray:itemsArray});




    //res.send("posts/foodList");
});


router.get('/myfood', async (req, res) => {
    //res.render("posts/foodList");


    if (!req.session.user) {
        return res.redirect("/login");

    }

    if (req.session.user.type!=="merchant") {
        return res.redirect("/food/list");
    }



    const itemsArray = await foodData.getFoodByMerchant(req.session.user.id);
    res.render("merchant/myfood", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:{foodCategoryHelper:"ALL"}});




    //res.send("posts/foodList");
});


router.get('/add', async (req, res) => {
    //res.render("posts/foodList");



    if (!req.session.user) {
       return res.redirect("/login")

    }

    if (req.session.user.type!=="merchant") {
        return res.redirect("/food/list")
    }



    res.render("posts/foodAdd");




});

//todo 缺少食物的主人才可以编辑的验证
router.post("/add", async (req, res) => {



    if (!req.session.user) {
        return res.send("没登录");

    }

    if (req.session.user.type!=="merchant") {
        return res.send("你不是merchant");
    }




    let foodName = req.body.foodName;
    let foodPrice = parseInt(req.body.foodPrice);
    let foodDes = req.body.foodDes;
    let foodCategory1 = req.body.foodCategory1;
    let foodCategory2 = req.body.foodCategory2;
    let merchantId = req.session.user.id;
    let stock = parseInt(req.body.stock);
    let filename;


    if (req.file) {
        filename = "/public/uploads/" + req.file.filename;
    }

    console.log(filename);
    //todo 不全的错误提示


    const newVar = await foodData.addFood(foodName, foodPrice, foodDes, filename,foodCategory1,foodCategory2,merchantId,stock);
    console.log(newVar._id.toString());

    res.redirect("/food/Detail/"+newVar._id.toString());



});

router.get('/login', async (req, res) => {




    res.render("posts/login");


});




module.exports = router;
