"use strict"

const express = require("express");
const router = express.Router();
const Mono = require('../models/Mono');

router.get("/", async (req, res) => {
    try {
        const arrayMonosDB = await Mono.find();
        console.log(arrayMonosDB);
        res.render("mono", {
            arrayMonos: arrayMonosDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crear',(req,res)=>{
    res.render('crear')
})

router.post('/', async(req,res)=>{
    const body=req.body
    console.log(body)
    try{
        const monosDB= new Mono(body)
        await monosDB.save()
        res.redirect('/monos')
    }catch(error){
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const monoDB = await Mono.findOne({ _id: id });
        if (!monoDB) {
            // Si no se encuentra el mono, renderizamos la vista de detalle con un mensaje de error.
            return res.render('detalle', {
                error: true,
                mensaje: 'Mono no encontrado'
            });
        }
        // Si el mono se encuentra, renderizamos la vista de detalle con los detalles del mono.
        res.render('detalle', {
            mono: monoDB,
            error: false
        });
    } catch (error) {
        console.log('Se ha producido un error', error);
        // Si ocurre un error durante la búsqueda del mono, renderizamos la vista de detalle con un mensaje de error.
        res.render('detalle', {
            error: true,
            mensaje: 'Se ha producido un error al buscar el mono'
        });
    }
});


router.delete('/:id', async(req,res)=>{
    const id= req.params.id;
    console.log('_id desde backend', id)
    try{
        const monoDB=await Mono.findByIdAndDelete({_id:id});
        console.log(monoDB)
        if(!monoDB){
            res.json({
                estado:false,
                mensaje:'No se puede eliminar el Mono'
            })

        }else{
            res.json({
                estado:true,
                mensaje:'Mono eliminado'
            })
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Mono.findByIdAndUpdate(id, body);
        res.json({ estado: true, mensaje: 'Mono actualizado' });
    } catch (error) {
        res.json({ estado: false, mensaje: 'Error al actualizar el mono', error: error });
    }
});




module.exports = router;