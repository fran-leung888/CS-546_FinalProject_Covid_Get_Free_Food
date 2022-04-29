const express = require('express');
const router = express.Router();
const data = require('../data');
const foodData = data.food;
const userData = data.users;


router.get('/', async (req, res) => {
  const users = await userData.getAllUsers();
  res.render('posts/new', {users: users});
});


router.get('/private', async (req, res) => {

  res.render('others/private', {
      username: req.session.user.username,
  });
  
});

router.get('food/:id', async (req, res) => {
  try {
    const post = await postData.getPostById(req.params.id);
    res.render('posts/single', {post: post});
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.get('/food/:id', async (req, res) => {
  res.render('posts/foodReservation');
});

router.get('/', async (req, res) => {
  const postList = await postData.getAllPosts();
  res.render('posts/index', {posts: postList});
});

router.post('/', async (req, res) => {
  let blogPostData = req.body;
  let errors = [];

  if (!blogPostData.title) {
    errors.push('No title provided');
  }

  if (!blogPostData.body) {
    errors.push('No body provided');
  }

  if (!blogPostData.posterId) {
    errors.push('No poster selected');
  }

  if (errors.length > 0) {
    const users = await userData.getAllUsers();
    res.render('posts/new', {
      errors: errors,
      hasErrors: true,
      post: blogPostData,
      users: users
    });
    return;
  }

  try {
    const newPost = await postData.addPost(
      blogPostData.title,
      blogPostData.body,
      blogPostData.tags || ["tag1","tag2"],
      blogPostData.posterId
    );

    res.redirect(`/posts/${newPost._id}`);
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.put('/:id', async (req, res) => {
  let updatedData = req.body;
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({error: 'Post not found'});
    return;
  }
  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({error: 'Post not found'});
    return;
  }

  try {
    await postData.removePost(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({error: e});
  }
});



router.get('/history', async (req, res) => {




  res.render("posts/userHistory");






});


router.get('/likes', async (req, res) => {




  res.render("posts/userLikes");






});

module.exports = router;
