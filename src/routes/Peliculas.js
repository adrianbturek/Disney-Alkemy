import { query } from 'express';
import  express from 'express';
const router = express.Router();

import PeliculasServices from '../Services/Peliculas-Services.js';
const peliculasServices = new PeliculasServices();
import verifytoken from '../routes/verifytoken.js'

//*******************
//PELICULAS Consultas
//********************

router.get('',verifytoken,async (req, res) => {
    console.log('Estoy en Peliculas Get');

    var peliculas = null;
    
    try{
    //a=1/1;

    // CHALLENGE - 7
    if (Object.entries(req.query).length === 0) {
        //Otra Manera
        //const isEmpty = JSON.stringify(req.query) === '{}';
        var peliculas = await peliculasServices.getAll();
    }
    
    // CHALLENGE - 10
    if (req.query.hasOwnProperty('titulo')) {
        var peliculas = await peliculasServices.getTitulo(req.query.titulo);
    }

    // CHALLENGE - 10
    if (req.query.hasOwnProperty('idgenero')) {
        var peliculas = await peliculasServices.getGenero(req.query.idgenero);
    }

    // CHALLENGE - 10
    if (req.query.hasOwnProperty('order')) {
        var peliculas = await peliculasServices.getOrder(req.query.order);
    }
    }
    catch (error) {
        return res.status(500).send({error: error.code, mensaje: error.message});
    }

    // CHALLENGE - 8
    if (req.query.hasOwnProperty('detallepeli')) {
        var peliculas = await peliculasServices.getDetallePeli(req.query.detallepeli);
    
    }       


    //return res.status(StatusCodes.OK).json(peliculas);
    console.log(peliculas);
    return res.status(200).json(peliculas);
 
    //console.log(res.status());
    /*if (res.status<>200) {
        return res.status(500).json({});    
    }
     else {
        return res.status(200).json(peliculas);
     }
     */

});


//****************
//PELICULAS INSERT
//****************

// CHALLENGE - 9

router.post('' , async (req,res) => {
    console.log('Estoy en Peliculas Insert');
    
    var peliculas = await peliculasServices.insert(req.body);
 
   //return res.status(StatusCodes.OK).json(peliculas);
   console.log(peliculas);
   return res.status(200).json(peliculas);
});


//****************
//PELICULAS UPDATE
//****************

// CHALLENGE - 9

router.put('' , async (req,res) => {
    console.log('Estoy en Peliculas Update');
    
    var peliculas = await peliculasServices.update(req.body);
 
   //return res.status(StatusCodes.OK).json(peliculas);
   console.log(peliculas);
   return res.status(200).json(peliculas);
})

//****************
//PELICULAS DELETE
//****************

// CHALLENGE - 9

router.delete('' , async (req,res) => {
    console.log('Estoy en Peliculas Delete');
    
    var peliculas = await peliculasServices.delete(req.body.id);
 
    //return res.status(StatusCodes.OK).json(peliculas);
    console.log(peliculas);
    return res.status(200).json(peliculas);
})

//*********************
//PELICULAS DELETE x ID
//*********************

// CHALLENGE - 9

router.delete("/:id" , async (req,res) => {
    console.log('Estoy en Peliculas Delete x Id');
    const {id}= req.params; // esta es otra manera queresmos el id que viene de parametro
    console.log(id);

    var peliculas = await peliculasServices.delete(id);
 
    //return res.status(StatusCodes.OK).json(peliculas);
    console.log(peliculas);
    return res.status(200).json(peliculas);
    
})

export default router;
