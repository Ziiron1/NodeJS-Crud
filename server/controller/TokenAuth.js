const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

router.get("/auth", verifyToken, (req, res) => {
  return res.json({ message: "Acesso autorizado" });
});

module.exports = router;
