const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Carregando as variáveis de ambiente
dotenv.config();

mongoose.set("strictQuery", true);
// Conectando ao banco de dados
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema de usuário
const User = mongoose.model("users");

const router = express.Router();

router.post("/login", async (req, res) => {
  // Verificando se as informações necessárias foram fornecidas
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  } // Procurando o usuário com o email fornecido
  const user = await User.findOne({ email: req.body.email });

  // Verificando se o usuário foi encontrado
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  // Comparando as senhas
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  // Verificando se as senhas são iguais
  if (!isMatch) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  // Gerando um token com as informações do usuário e uma chave secreta
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY
  );

  // Retornando o token para o usuário
  return res.json({ token, hashSenha: user.password });
});

module.exports = router;
