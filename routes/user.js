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


//todo 可以照着改改
router.get('/account/:id', async (req, res) => {

    //const user = await userData.getUserById(req.params.id);
    res.render('users/account');

});

router.post('/edit', async (req, res) => {
    const input = req.body;
    const id = input['id'];
    const image = input['image'];
    const name = input['name'];
    const password = input['password'];
    const mobileNumber = input['mobileNumber'];
    const zipCode = input['zipCode'];
    const discription = input['discription']

    try {
        const user = await userData.update(id, name, password, image, mobileNumber, zipCode, discription);
        res.render('users/account', {user: user});
    } catch (e) {
        console.log(e);
    }


});


//todo 可以照着改改
router.post('/signup', async (req, res) => {
    const input = req.body;
    const username = input['username'];
    const password = input['password'];
    userData.create(username, password);

    const createReturn = await userData.create(username, password);

    if (createReturn.dbDown) {

        res.status(500).render('users/signup', {
            dbDown: true
        });
    }

    if (createReturn.userInserted) {

        res.redirect('/');

    } else {

        res.status(400).render('users/signup', {
            error: true
        });

    }

});

router.post('/login', async (req, res) => {
    const input = req.body;
    const username = input['username'];
    const password = input['password'];

    const checkReturn = await userData.checkUser(username, password);

    if (checkReturn.authenticated) {

        req.session.user = {username: username};
        res.redirect('/private');

    } else {

        res.status(400).render('users/login', {
            error: true
        });

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
