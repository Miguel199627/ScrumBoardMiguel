// Importamos modulos necesarios
const mongoose = require("mongoose");

// Colección de tablero
const boardSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: { type: Date, default: Date.now() }
});

// Coleccion board
const Board = mongoose.model("board", boardSchema);

// Export the module
module.exports = Board;
