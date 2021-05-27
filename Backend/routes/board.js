// Importamos modulos
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Registrar una actividad sin imagen - async await POST
// Ruta completa: http://localhost:3001/api/board/saveTask
router.post("/saveTask", Auth, async (req, res) => {
    // Buscamos el usuario de la petición
    const user = await User.findById(req.user._id);
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

// Consultar todas las actividades - async await GET
// Ruta completa: http://localhost:3001/api/board/listTask
router.get("/listTask", Auth, async (req, res) => {
    // Buscamos usuario de la petición
    const user = await User.findById(req.user._id);
    // Si no se encuentra el usuario
    if (!user) return res.status(400).send("Usuario no autenticado");
    // Si el usuario existe procedemos a listar
    const board = await Board.find({ userId: req.user._id });
    return res.status(200).send({ board });
});

// Editar una actividad - async await PUT
// Ruta completa: http://localhost:3001/api/board/updateTask
router.put("/updateTask", Auth, async (req, res) => {
    // Buscamos usuario de la petición
    const user = await User.findById(req.user._id);
    // Si no se encuentra el usuario
    if (!user) return res.status(400).send("Usuario no autenticado");
    // Si el usuario existe procedemos a editar
    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: user._id, 
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    });
    if (!board) return res.status(400).send("no se pudo editar la actividad");
    return res.status(200).send({ board });
});

// Eliminar una tarea - async await DELETE
// Ruta completa: http://localhost:3001/api/board/:_id
router.delete("/:_id", Auth, async (req, res) => {
    // Buscamos usuario de la petición
    const user = await User.findById(req.user._id);
    // Si no se encuentra el usuario
    if (!user) return res.status(400).send("Usuario no autenticado");
    // Si el usuario existe procedemos a eliminar
    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(400).send("no se pudo eliminar la actividad");
    return res.status(200).send("Actividad eliminada");
});

// Exportamos el modulo
module.exports = router;