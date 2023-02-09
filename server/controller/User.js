
const bcrypt = require("bcryptjs");
const User = require("../model/UserSchema");
const { uuid } = require("uuidv4");


exports.createUser = (req, res) => {
  const user = new User({
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: new Date(),
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully",
        user: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.findAllUsers = (req, res) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        message: "User list",
        users: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.findUserById = (req, res) => {
  const id = req.params.id;

  User.findOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "User found",
        user: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updateOps = req.body;

  if (updateOps.password) {
    updateOps.password = bcrypt.hashSync(updateOps.password, 8);
  }

  User.update({ _id: id }, { $set: updateOps })
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json({ "msg": "Usuário excluído com sucesso" }))
    .catch((err) =>
      res.status(404).json({ "nouserfound": "Nenhum usuário encontrado com esse ID" })
    );
};
