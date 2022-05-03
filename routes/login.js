const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;



router.post("/", async (req, res) => {

    //todo 校验




    try {
        const userId = await userData.checkUser(req.body["username"],req.body["password"]);
        res.redirect("food/list");


    } catch (e) {

        //页面显示错误 account不能用之类
        //res.redirect("fake/login3")

        req.session.signUpMsg=e.toString()
        res.redirect("fake/login2")

        // res.render("users/login", { msg2: e},);




    }







});


module.exports = router;
