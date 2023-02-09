let counter = 0;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/UserSchema");
dotenv.config();
const { uuid } = require("uuidv4");
const app = express();

const cors = require("cors");
app.use(cors());


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use(express.json());

app.use("/", require("./test/login"))
app.use("/token", require("./controller/TokenAuth"))
// CREATE - POST request
app.post("/users", (req, res) => {
  const user = new User({
    id: uuid(),
    internalId: ++counter,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
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
});

// READ - GET request
app.get("/users", (req, res) => {
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
});


// READ - GET request for a specific id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  User.findOne({ internalId: id })
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
});



// UPDATE - PATCH request
app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
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
});

// DELETE - DELETE request
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  User
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});