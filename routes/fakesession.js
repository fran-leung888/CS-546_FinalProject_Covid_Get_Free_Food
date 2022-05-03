//todo 模拟一下登录
const express = require("express");
const data = require("../data");
const {ObjectId} = require("mongodb");
const router = express.Router();
const foodData = data.food;

router.get('/login', async (req, res) => {



    req.session.user ={id:"1",type:"merchant",name:"merchant1"}

    console.log(1);
    res.json(req.session.user)



});


router.get('/login2', async (req, res) => {


    if(req.session.signUpMsg){
        let msg=req.session.signUpMsg
        req.session.signUpMsg=null;
        return res.render('users/login',{msg2:msg});
    }

    res.render('users/login');



});


router.get('/register', async (req, res) => {



    res.render('users/login');



});





module.exports = router;
