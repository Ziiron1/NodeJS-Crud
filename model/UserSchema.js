const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { uuid } = require("uuidv4");

const UserSchema = new mongoose.Schema({
  internalId: {
    type: Number,
  },
  id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Função middleware para criptografar a senha antes de salvar no banco
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
