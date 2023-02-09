const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/auth', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        return res.json({ message: 'Acesso autorizado' });
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
});

module.exports = router;
