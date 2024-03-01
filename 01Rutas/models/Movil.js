"use strict";

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const movilesSchema = new Schema({
    id: String,
    marca: String,
    modelo: String,
    descripcion: String
});

const Movil = mongoose.model('Movil', movilesSchema,"moviles");
//Mono -- Modelo
//monos bbdd

module.exports = Movil;
