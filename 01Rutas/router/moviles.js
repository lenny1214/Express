"use strict";

const express = require("express");
const router = express.Router();
const Movil = require('../models/Movil');

router.get("/", async (req, res) => {
    try {
        const arrayMovilesDB = await Movil.find();
        console.log(arrayMovilesDB);
        res.render("movil", {
            arrayMoviles: arrayMovilesDB
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/crear',(req,res)=>{
    res.render('crear');
});

router.post('/', async(req,res)=>{
    const { id, marca, modelo, descripcion, image } = req.body;

    try {
        const movilesDB = new Movil({ id, marca, modelo, descripcion, image });
        await movilesDB.save();
        res.redirect('/moviles');
    } catch (error) {
        console.log('error', error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const movilDB = await Movil.findOne({ _id: id });
        if (!movilDB) {
            return res.render('detalle', {
                error: true,
                mensaje: 'Móvil no encontrado'
            });
        }
        res.render('detalle', {
            movil: movilDB,
            error: false
        });
    } catch (error) {
        console.log('Se ha producido un error', error);
        res.render('detalle', {
            error: true,
            mensaje: 'Se ha producido un error al buscar el móvil'
        });
    }
});

router.delete('/:id', async(req,res)=>{
    const id= req.params.id;
    console.log('_id desde backend', id)
    try{
        const movilDB=await Movil.findByIdAndDelete({_id:id});
        console.log(movilDB)
        if(!movilDB){
            res.json({
                estado:false,
                mensaje:'No se puede eliminar el Móvil'
            });
        }else{
            res.json({
                estado:true,
                mensaje:'Móvil eliminado'
            });
        }
    }catch(error){
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Movil.findByIdAndUpdate(id, body);
        res.json({ estado: true, mensaje: 'Móvil actualizado' });
    } catch (error) {
        res.json({ estado: false, mensaje: 'Error al actualizar el móvil', error: error });
    }
});

module.exports = router;
