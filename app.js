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



// const users = require("./data/users");
// const albums = require("./data/albums")


// async function main() {

//     users
//     const Qinyun = await users.create("Qinyun Wang", "wqy1998", "5512616439", "07030", "I'm happy");
//     console.log(Qinyun);
//     const Annie = await users.create("Annie Chen", "can1998", "5512616438", "07031", "I'm so cute");
//     console.log(Annie);
//     const XingFang = await users.create("XingFang Tan", "yxf1993", "5512616437", "07032", "I'm so old");
//     console.log(XingFang);

// const a = await bands.get("62252dc3ad5a274b1620a39e");
// console.log(a);

// const b = await bands.getAll();
// console.log(b);

// const c = await bands.remove("62252deb4b70fa888100f599");
// console.log(c);

// const theBeatles = await bands.update("6225536c7aad6bdc570228ec", "Tahe Beatles", ["Psychedelic rock", "Blue"], "http://www.theBeatles.com", "Apple Corps", ["John Lennon", "Paul McCartney", "George Harrison"], 1957);
// console.log(theBeatles);



// albums
// const theBeatlesAlbum = await albums.create("6225536c7aad6bdc570228ec", "A", "01/12/2023", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], 6);
// console.log(theBeatlesAlbum);
// const theBeatlesAlbum2 = await albums.create("6225536c7aad6bdc570228ec", "B", "03/12/2020", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], 4);
// console.log(theBeatlesAlbum2);

// const a = await albums.getAll("62252dc3ad5a274b1620a39e");
// console.log(a);

// const a = await albums.get("622530010682ed697c7165d3");
// console.log(a);

// const a = await albums.remove("622581c9c425f2d2aaa0d59e");
// console.log(a);

// }

// main().catch((err) => {
//     console.log(err);
// });



