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


module.exports = router;
