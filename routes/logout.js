const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;



router.get('/', async (req, res) => {


    try {
        if(!req.session.user){
            return res.redirect("/")
        }

        req.session.destroy();


        res.redirect("/");
    }catch (e) {
        res.redirect("/");

    }





});




module.exports = router;
