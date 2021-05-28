/**
 * Descripcion: Sección del tablero de scrum
 * Autor: Miguel Angel Cerquera R
 * Fecha modificacion: 28/05/2021
 */

const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Guardar tareas
router.post("/saveTask", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");

    const valiRes = valiCampos(req.body);
    if (valiRes) return res.status(400).send(valiRes);

    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do"
    });
    const result = await board.save();
    return res.status(200).send({ result });
});

// Listar tareas
router.get("/listTask", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");

    const board = await Board.find({ userId: req.user._id });
    return res.status(200).send({ board });
});

// Actualizar tareas
router.put("/updateTask", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");

    const valiRes = valiCampos(req.body);
    if (valiRes) return res.status(400).send(valiRes);
    if(!req.body.status) return res.status(400).send("Faltan campos");

    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: user._id, 
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    });
    if (!board) return res.status(400).send("no se pudo editar la actividad");
    return res.status(200).send({ board });
});

// Eliminar tareas
router.delete("/:_id", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");

    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(400).send("no se pudo eliminar la actividad");
    return res.status(200).send("Actividad eliminada");
});

// Validar campos generales resividos en el body
const valiCampos = (body) => {
    if(Object.keys(body).length === 0) return "No vienen campos";
    if(!body.name || !body.description) return "Faltan campos";
    return false;
};

module.exports = router;