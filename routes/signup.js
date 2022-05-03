const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/", async (req, res) => {

    //todo 校验


    const hashedPassword = await bcrypt.hash(req.body["password"], saltRounds);


    try {
        const userId = await userData.createUser(req.body["username"],hashedPassword);
        res.render("users/login", { msg2: "Account created! Now, log in."});


    } catch (e) {

      //页面显示错误 account不能用之类
        //res.redirect("fake/login3")

        req.session.signUpMsg=e.toString()
        res.redirect("fake/login2")

        // res.render("users/login", { msg2: e},);




    }







});


module.exports = router;
