const express = require('express');
const router = express.Router();
const data = require('../data');
const foodData = data.food;
const userData = data.users;
const xss = require('xss');


router.post('/addLike', async (req, res) => {

    console.log(1);

    //todo 捕捉异常
    if (req.session.user) {
        let foodId = req.body.foodId;
        let userId = req.session.user.id;

        if (await userData.createLikes(foodId, userId)) {
            return res.status(200).send("red");
        }else{
            return res.status(200).send("grey");

        }
    } else {
        return res.status(200).send("black");


    }


});










router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('users/logout');
});


router.get('/history', async (req, res) => {


    if (!req.session.user) {
        return res.redirect("/login");

    }
    const user = await userData.getUserById(req.session.user.id);
    res.render("posts/userHistory", {user: user});


});


router.get('/likes', async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");

    }
    const user = await userData.getUserById(req.session.user.id);

    if(!user.likedFood){
        user.likedFood=[]
    }
    const itemsArray = await foodData.getFoodInList(user.likedFood);

    res.render("posts/userLikes", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:{foodCategoryHelper:"ALL"}});


});



router.get('/myfood', async (req, res) => {
    //res.render("posts/foodList");







    const itemsArray = await foodData.getFoodByMerchant(req.session.user.id);




    //res.send("posts/foodList");
});

module.exports = router;
