const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

const bcrypt = require('bcrypt');
const saltRounds = 10;



router.get('/user', async (req, res) => {


    //todo 已经登录就不能再进入了

    if(req.session.user){
        return res.redirect("/")
    }

    //如果刚post过再redirect回来就会显示msg
    if(req.session.signUpUserMsg){
        let msg=req.session.signUpUserMsg
        //通过session传递消息 显示一次后就销毁
        req.session.signUpUserMsg=null;
        return res.render('users/signupUser',{msg:msg});
    }

    res.render('users/signupUser');



});


router.get('/merchant', async (req, res) => {


    //todo 已经登录就不能再进入了

    if(req.session.user){
        return res.redirect("/")
    }

    //如果刚post过再redirect回来就会显示msg
    if(req.session.signUpMerchantMsg){
        let msg=req.session.signUpMerchantMsg
        //通过session传递消息 显示一次后就销毁
        req.session.signUpMerchantMsg=null;
        return res.render('users/signupMerchant',{msg:msg});
    }

    res.render('users/signupMerchant');



});



router.post("/user", async (req, res) => {

    //todo 校验


    const hashedPassword = await bcrypt.hash(req.body["password"], saltRounds);


    try {
        const userId = await userData.createUser(req.body["username"],hashedPassword);

        //通过session传递 跳转后要显示的msg
        req.session.loginMsg="user created! Now, log in."
        res.redirect("/login")



    } catch (e) {

      //页面显示错误 account不能用之类

        //通过session传递 跳转后要显示的msg
        req.session.signUpUserMsg=e.toString()
        res.redirect("/signup/user")





    }







});


router.post("/merchant", async (req, res) => {

    //todo 校验


    const hashedPassword = await bcrypt.hash(req.body["password"], saltRounds);


    try {
        const userId = await userData.createMerchant(req.body["username"],hashedPassword,req.body["restaurantName"]);
        //通过session传递 跳转后要显示的msg
        req.session.loginMsg="merchant created! Now, log in."
        res.redirect("/login")


    } catch (e) {

        //页面显示错误 account不能用之类
        //res.redirect("fake/login3")

        req.session.signUpMerchantMsg=e.toString()
        res.redirect("/signup/merchant")

        // res.render("users/login", { msg2: e},);




    }







});


module.exports = router;
