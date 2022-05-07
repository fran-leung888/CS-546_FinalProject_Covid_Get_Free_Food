const express = require("express");
const data = require("../data");
const router = express.Router();
const foodData = data.food;
const userData = data.users;




router.get('/list', async (req, res) => {
    
    try {
        console.log(req.query);

        if (JSON.stringify(req.query ) === '{}') {
            console.log("no searching filter")
            const itemsArray = await foodData.getAllFood();
            res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray});


        }else{
            console.log("with searching filter")

            //filterObj 只包含foodCategory1 foodCategory2
            let filterObj={}
            let likesOrder=0
            if(req.query.foodCategory1){
                filterObj["foodCategory1"]=req.query.foodCategory1
            }
            if(req.query.foodCategory2){
                filterObj["foodCategory2"]=req.query.foodCategory2
            }
            if(req.query.likesOrder){
                likesOrder=1
            }

            const itemsArray = await foodData.getFoodByFilter(filterObj,likesOrder);
            console.log(req.query);
            res.render("posts/foodList", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:req.query});

        }
    }catch (e) {
        return res.redirect("/food/list")
    }




});

router.get('/edit/:id', async (req, res) => {
    //res.render("posts/foodList");


    try {
        const food = await foodData.getFood(req.params.id);
        if(!food){
            return res.redirect("/food/list")
        }

        if(!req.session.user){
            return res.redirect("/login")
        }
        if(req.session.user.id!==food.merchantId){
            return res.redirect("/food/list")

        }

        if(req.session.msg){
            let msg=req.session.msg
            //通过session传递消息 显示一次后就销毁
            req.session.msg=null;
            return res.render("posts/foodEdit",{msg:msg,foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename,stock:food.stock});

        }



        res.render("posts/foodEdit",{foodName:food.foodName,foodPrice:food.foodPrice,foodDes:food.foodDes,filename:food.filename,stock:food.stock});
    }catch (e) {
        res.redirect("/food/list")
    }






});









router.get('/detail/:id', async (req, res) => {


    try {
        const food = await foodData.getFood(req.params.id);

        if(!food){
            return res.redirect("/food/list")

        }



        food.liked=0
        if (req.session.user) {



            if (await userData.checkLiked(req.params.id, req.session.user.id)) {
                food.liked=1
            }



            //自己发表的评论才可以出现delete按钮
            for (const key in food.comment) {
                if (food.comment[key]["userId"] === req.session.user.id) {
                    food.comment[key]["isMine"]=1
                }
            }
        }

        if(req.session.msg){
            let msg=req.session.msg
            //通过session传递消息 显示一次后就销毁
            req.session.msg=null;
            return res.render("posts/foodDetail",{msg:msg,foodId:food._id.toString(),foodName:food.foodName,foodPrice:food.foodPrice
                ,foodDes:food.foodDes,filename:food.filename,stock:food.stock,comments:food.comment,liked:food.liked});
        }



        res.render("posts/foodDetail",{foodId:food._id.toString(),foodName:food.foodName,foodPrice:food.foodPrice
            ,foodDes:food.foodDes,filename:food.filename,stock:food.stock,comments:food.comment,liked:food.liked});
    }catch (e) {
        res.redirect("/food/list")

    }




});

router.get('/order/:id/:amount', async (req, res) => {

    console.log(1);
    try {
        if (!req.session.user) {
            return res.redirect("/login");

        }

        const food = await foodData.orderFood(req.params.id,req.session.user.id,req.params.amount);

        res.redirect("/user/history")
    }catch (e) {

        req.session.msg=e.toString()
        return res.redirect("/food/detail/"+req.params.id)
    }




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

    try {
        if (!req.session.user) {
            return res.redirect("/login");

        }



        await foodData.createComment(req.params.id,req.session.user.id,req.session.user.username,req.body.commentContent);


        res.redirect("/food/Detail/"+req.params.id.toString());
    }catch (e) {
        req.session.msg=e.toString()
        res.redirect("/food/Detail/"+req.params.id.toString());

    }




});



//todo 缺少食物的主人才可以编辑的验证
router.post("/edit/:id", async (req, res) => {

    try {

        if (!req.session.user) {
            return res.redirect("/login");

        }

        if (req.session.user.type!=="merchant") {
            return res.redirect("/food/list");
        }
        let foodName = req.body.foodName;
        let foodPrice = req.body.foodPrice;
        let foodDes = req.body.foodDes;
        let stock = req.body.stock;
        let filename;

        //file可能是有或者没有的
        if (req.file) {
            filename = req.file.filename;
        }
        const newVar = await foodData.updateFood(req.params.id,foodName, foodPrice, foodDes, filename,stock);
        console.log(newVar._id.toString());
        res.redirect("/food/Detail/"+newVar._id.toString());
    }catch (e) {

        req.session.msg=e.toString()
        res.redirect("/food/edit/"+req.params.id);

    }











});

module.exports = router;
