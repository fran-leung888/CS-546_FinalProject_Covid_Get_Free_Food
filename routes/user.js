const express = require('express');
const router = express.Router();
const data = require('../data');
const foodData = data.food;
const userData = data.users;




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
  userData.create(username,password);

  const createReturn = await userData.create(username,password);

  if (createReturn.dbDown){

      res.status(500).render('users/signup', {
          dbDown: true
      });
  }

  if (createReturn.userInserted){

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

  const checkReturn = await userData.checkUser(username,password);

  if (checkReturn.authenticated){

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



router.get('/history/:id', async (req, res) => {



  const user = await userData.getUserById(req.params.id);
  res.render("posts/userHistory", {user: user});






});


router.get('/likes', async (req, res) => {




  res.render("posts/userLikes");






});

module.exports = router;
