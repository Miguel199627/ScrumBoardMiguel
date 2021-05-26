// Importamos modulos
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Registrar una actividad sin imagen - async await POST
// Ruta completa: http://localhost:3001/api/auth/login
router.post("/saveTask", Auth, async (req, res) => {
    // Buscamos el usuario de la petición
    const user = User.findById(req.user._id);
    // Si no se encuentra el usuario
    if (!user) return res.status(400).send("Usuario no autenticado");
    // Si el usuario existe procedemos a registrar
    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do"
    });
    // Guardamos en MongoDB
    const result = await board.save();
    return res.status(200).send({ result });
});

// Exportamos el modulo
module.exports = router;