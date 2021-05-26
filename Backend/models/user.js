// Importamos modulos necesarios
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// Creación del esquema de colección
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now() }
});

// Generación del jwt
userSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        iat: moment().unix()
    },
    "MARC1996"
    );
};

// Informamos a MongoDB cual sera su esquema de colección
const User = mongoose.model("user", userSchema);

// Exportamos el modulo al backend
module.exports = User;