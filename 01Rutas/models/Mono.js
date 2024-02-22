"use srtict"

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const monosSchema = new Schema({
    id: String,
    nombre: String,
    tipo: String,
    descripcion: String
})

const Mono = mongoose.model('Mono', monosSchema,"monos");
//Mono -- Modelo
//monos bbdd

module.exports=Mono;

