// Importamos modulos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Ruta para agregar usuarios al sistema - tipo: async, await, POST
// Ruta completa: http://localhost:3001/api/user/addUser
router.post("/addUser", async (req, res) => {
    // Validar correo en la DB
    let user = await User.findOne({ email: req.body.email });
    // Si el usuario ya existe finaliza la ejecución y se envia un mensaje
    if (user) return res.status(400).send("El usuario ingresado ya existe");
    // Encriptar la contraseña
    const hash = await bcrypt.hash(req.body.password, 10);
    // Adición de datos al esquema de la colección user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });
    // Registramos el usuario
    const result = await user.save();
    if(result) {
        // JWT
        const jwtToken = user.generateJWT();
        return res.status(200).send({ jwtToken });
    } else {
        return res.status(400).send("No se logro registrar el usuario");
    }
});

// Exportamos rutas al backend
module.exports = router;