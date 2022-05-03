const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;



router.get('/', async (req, res) => {


    //todo 已经登录就不能再进入了

    if(req.session.user){
        return res.redirect("/")
    }

    //todo 如果上一次没注册成功就会显示错误信息
    if(req.session.loginMsg){
        let msg=req.session.loginMsg
        req.session.loginMsg=null;
        return res.render('users/login',{msg:msg});
    }

    res.render('users/login');



});


router.post("/", async (req, res) => {

    //todo 校验




    try {
        let user = await userData.checkUser(req.body["username"],req.body["password"]);

        //登陆成功 加session
        user={id:user._id.toString(),username:user.username,type:user.type}
        req.session.user=user
        return res.redirect("food/list");


    } catch (e) {

        //页面显示错误 account不能用之类
        //res.redirect("fake/login3")

        req.session.loginMsg=e.toString()
        res.redirect("/login")

        // res.render("users/login", { msg2: e},);




    }







});


module.exports = router;
