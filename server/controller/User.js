const User = require("../model/UserSchema");

exports.createUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No users found" }));
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: "User updated successfully" }))
    .catch((err) =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json({ msg: "User deleted successfully" }))
    .catch((err) =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
};
