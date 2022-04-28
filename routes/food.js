const express = require("express");
const data = require("../data");
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

router.get('/edit/:id', async (req, res) => {
    //res.render("posts/foodList");


    //todo 把已经有的信息渲染上 但是可以修改的状态

    const food = await foodData.getFood(req.params.id);

    res.render("posts/foodEdit",{foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename});





});


router.get('/add', async (req, res) => {
    //res.render("posts/foodList");




    res.render("posts/foodAdd");




});


router.get('/detail/:id', async (req, res) => {
    //res.render("posts/foodList");
    //todo 渲染详情
    const food = await foodData.getFood(req.params.id);

    res.render("posts/foodDetail",{foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename});



});


//todo 缺少食物的主人才可以编辑的验证
router.post("/add", async (req, res) => {

    let foodName = req.body.foodName;
    let foodPrice = parseInt(req.body.foodPrice);
    let foodDes = req.body.foodDes;
    let foodCategory1 = req.body.foodCategory1;
    let foodCategory2 = req.body.foodCategory2;
    let filename;


    if (req.file) {
        filename = "/public/uploads/" + req.file.filename;
    }

    console.log(filename);
    //todo 不全的错误提示
    if (!foodName || !foodPrice || !foodDes || !filename) {

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

    const newVar = await foodData.addFood(foodName, foodPrice, foodDes, filename,foodCategory1,foodCategory2);
    console.log(newVar._id.toString());

    res.redirect("/food/Detail/"+newVar._id.toString());



});



//todo 缺少食物的主人才可以编辑的验证
router.post("/edit/:id", async (req, res) => {
    let updateObj={}

    if (req.body.foodName) {
        updateObj['foodName']=req.body.foodName
    }
    if (req.body.foodDes) {
        updateObj['foodDes']=req.body.foodDes
    }
    if (req.body.foodPrice) {
        updateObj['foodPrice']=parseInt(req.body.foodPrice)
    }
    if (req.file) {
        updateObj['filename'] = "/public/uploads/" + req.file.filename;
    }





    const newVar = await foodData.updateFood(req.params.id,updateObj);
    //todo 这里的返回值处理 应该是判断一下是否更新成功
    console.log(newVar._id.toString());

    res.redirect("/food/Detail/"+newVar._id.toString());



});

module.exports = router;
