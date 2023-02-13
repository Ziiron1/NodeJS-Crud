const userRoutes = require("./routes/User");
const GameRoutes = require("./routes/Game")
const express = require("express");
const mongoose = require("mongoose");
// const User = require("./model/UserSchema");

require("dotenv").config();
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.static(__dirname + "/view"));

mongoose.set("strictQuery", true);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
}

connectToMongoDB();

app.use(express.json());

app.use("/", userRoutes);
app.use("/", GameRoutes);
app.use("/", require("./test/login"));
app.use("/token", require("./controller/TokenAuth"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
