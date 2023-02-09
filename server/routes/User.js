// const bcrypt = require("bcryptjs");
// const User = require("../model/UserSchema");
// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(express.json());
// app.use(cors());
// const { uuid } = require("uuidv4");

// // CREATE - POST request
// app.post("/users", (req, res) => {
//     const user = new User({
//         id: uuid(),
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         date: req.body.date,
//     });

//     user
//         .save()
//         .then((result) => {
//             res.status(201).json({
//                 message: "User created successfully",
//                 user: result,
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// });

// // READ - GET request
// app.get("/users", (req, res) => {
//     User.find()
//         .then((result) => {
//             res.status(200).json({
//                 message: "User list",
//                 users: result,
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// });

// // READ - GET request for a specific id
// app.get("/users/:id", (req, res) => {
//     const id = req.params.id;

//     User.findOne({ _id: id })
//         .then((result) => {
//             res.status(200).json({
//                 message: "User found",
//                 user: result,
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// });

// // UPDATE - PATCH request
// app.patch("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const updateOps = req.body;

//     if (updateOps.password) {
//         updateOps.password = bcrypt.hashSync(updateOps.password, 8);
//     }

//     User.update({ _id: id }, { $set: updateOps })
//         .then((result) => {
//             res.status(200).json({
//                 message: "User updated",
//                 result: result,
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// });

// // DELETE - DELETE request
// app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;

//     User.deleteOne({ _id: id })
//         .then((result) => {
//             res.status(200).json({
//                 message: "User deleted",
//                 result: result,
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// });

// module.exports = app;


const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/users', userController.createUser);
router.get('/users', userController.findAllUsers);
router.get('/users/:id', userController.findUserById);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;