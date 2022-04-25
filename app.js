const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

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
    }
  },
  partialsDir: [
    'views/posts/'
  ]
});

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));

app.engine('handlebars', handlebarsInstance.engine);

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'handlebars');


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
    cb(null, path.join(__dirname, 'public', 'images'))

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let ext = path.extname(file.originalname);
    cb(null,  uniqueSuffix+ext)

  }
})

const upload = multer({ storage: storage }).single("imageForMulter")

app.use(upload)


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

    //bands
    // const pinkFloyd = await users.create("Chicken");
    // console.log(pinkFloyd._id);
    // const theBeatles = await users.create("Pizza");
    // console.log(theBeatles);

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



