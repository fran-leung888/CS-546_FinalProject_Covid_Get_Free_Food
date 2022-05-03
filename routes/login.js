const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

// router.post("/", async (req, res) => {
//
//     //todo 校验
//
//
//     const hashedPassword = await bcrypt.hash(req.body["password"], saltRounds);
//
//
//     try {
//         const userId = await userData.createUser(req.params.account,hashedPassword);
//
//         if (userId) {
//             res.status(401).render("login", {
//                 errorMsg:
//                     "Could not create your account. User already exists.",
//             });
//             return;
//         }
//     } catch (e) {
//         if (e == ERRORS.NOEXIST) {
//             // user does not exist
//             await users.addUser(
//                 req.body["name"],
//                 req.body["email"],
//                 passHash
//             );
//         }
//     }
//
//
//
//     console.log(newVar._id.toString());
//
//     res.redirect("/food/Detail/"+newVar._id.toString());
//
//
//
// });