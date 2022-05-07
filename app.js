const express = require('express');
const app = express();

const static = express.static(__dirname + '/public');
const session = require("express-session");

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const path = require("path");

const multer  = require('multer')

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    whichLinks: () => 'head/links'
  },
  partialsDir: [
    'views/posts/',
    'views/partials/',
    'views/home/'
  ]
});




app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));

app.engine('handlebars', handlebarsInstance.engine);

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'handlebars');


// init session
app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

// app.post('/foodEdit/:id', upload.single('imageForMulter'), function (req, res, next) {
//
//   console.log(req.body);
//
//   res.render("posts/foodList")
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'))

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let ext = path.extname(file.originalname);
    cb(null,  uniqueSuffix+ext)

  }
})

const upload = multer({ storage: storage }).single("imageForMulter")

app.use(upload)


app.use('/*', async (req, res, next) => {

  handlebarsInstance.handlebars.registerHelper('username', function() {

    console.log("I'm in a middleware");

    if (req.session.user) {
      return req.session.user.username;

    }else{
      return "you have not logged";
    }
  })

  handlebarsInstance.handlebars.registerHelper('logged', function () {

    console.log(333);
    if (req.session.user) {
      return true
    }
    return null
  })

  handlebarsInstance.handlebars.registerHelper('loggedAsUser', function () {

    console.log(444);
    if (req.session.user) {
      if(req.session.user.type==="merchant"){
        return null;
      }else if(req.session.user.type==="user"){
        return true;
      }
    }
    return null;
  })






  next();
});


configRoutes(app);


// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'public', 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     let ext = path.extname(file.originalname);
//     cb(null, uuid.v4() + ext);
//   }
// })

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});




