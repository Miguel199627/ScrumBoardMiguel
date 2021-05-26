// Importamos modulos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Login del usuario - async await POST
// Ruta completa: http://localhost:3001/api/auth/login
router.post("/login", async (req, res) => {
    // Buscamos el correo del usuario
    let user = await User.findOne({ email: req.body.email });
    // Validamos si el correo trae o no resultados
    if (!user) return res.status(400).send("Email o password incorrectos");
    // Comparamos el password que ingreso el usuario con el de la db
    const hash = await bcrypt.compare(req.body.password, user.password);
    // Validamos si el password coincide o no
    if (!hash) return res.status(400).send("Email o password incorrectos");
    // Devolvemos el token
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
});

// Exportamos el modulo
module.exports = router;