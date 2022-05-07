const express = require('express');
const router = express.Router();
const data = require('../data');
const foodData = data.food;
const userData = data.users;
const xss = require('xss');

//这是一个ajax操作
router.post('/addLike', async (req, res) => {


    try {
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
    }catch (e) {
        return res.status(200).send("black");

    }



});












router.get('/history', async (req, res) => {


    try {
        if (!req.session.user) {
            return res.redirect("/login");

        }
        const user = await userData.getUserById(req.session.user.id);
        res.render("posts/userHistory", {user: user});
    }catch (e) {
        return res.redirect("/food/list")
    }



});


router.get('/likes', async (req, res) => {

    try {
        if (!req.session.user) {
            return res.redirect("/login");

        }
        const user = await userData.getUserById(req.session.user.id);

        if(!user.likedFood){
            user.likedFood=[]
        }
        const itemsArray = await foodData.getFoodInList(user.likedFood);

        res.render("posts/userLikes", {pageTitle: "List of All Items", itemsArray: itemsArray,searchParams:{foodCategoryHelper:"ALL"}});
    }catch (e) {
        return res.redirect("/food/list")
    }




});





module.exports = router;
