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









router.get('/detail/:id', async (req, res) => {
    //res.render("posts/foodList");
    //todo 渲染详情
    const food = await foodData.getFood(req.params.id);

    //todo 同时把评论也渲染上去


    if (req.session.user) {
        for (const key in food.comment) {
            if (food.comment[key]["userId"] === req.session.user.id) {
                food.comment[key]["isMine"]=1
            }
        }
    }



    res.render("posts/foodDetail",{foodId:food._id.toString(),foodName:food.foodName,foodPrice:food.foodPrice
        ,foodDes:food.foodDes,filename:food.filename,stock:food.stock,comments:food.comment});



});

router.get('/order/:id/:amount', async (req, res) => {

    //todo 没登陆不能点
    if (!req.session.user) {
        return res.redirect("/login");

    }
    const food = await foodData.orderFood(req.params.id,req.session.user.id,req.params.amount);

    res.redirect("/user/history")
    //res.render("posts/foodDetail",{foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename,stock:food.stock});



});


router.get('/deleteComment/:id', async (req, res) => {

    let commentId=req.params.id
    //todo 没登陆不能删除
    if (!req.session.user) {
        return res.redirect("/login");
    }
    //todo 查一下id主人是不是你 不是你不让删
    const food = await foodData.deleteComment(commentId,req.session.user.id);

    res.redirect('back');
    //res.render("posts/foodDetail",{foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename,stock:food.stock});



});


router.post("/comment/:id", async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");

    }



    //todo 这里没有返回值 应该没事
    await foodData.createComment(req.params.id,req.session.user.id,req.session.user.username,req.body.commentContent);


    res.redirect("/food/Detail/"+req.params.id.toString());



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
