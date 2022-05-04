const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;



router.get('/', async (req, res) => {

    if(!req.session.user){
        return res.redirect("/")
    }

    req.session.destroy();


    res.redirect("/");




});




module.exports = router;
