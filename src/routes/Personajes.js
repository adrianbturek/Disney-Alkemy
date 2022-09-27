import { query } from 'express';
import express from 'express';
const router=express.Router();

import PersonajesServices from '../Services/Personajes-Services.js';
const personajesServices = new PersonajesServices();
import verifytoken from '../routes/verifytoken.js'

//**********************
//PERSONAJES - CONSULTAS
//**********************

router.get("" , verifytoken,async (req,res) => {
    console.log('Estoy en Personajes Get');

    var personajes = null;

    // CHALLENGE - 3 
    if (Object.entries(req.query).length === 0) {
        var personajes = await personajesServices.getAll();
    }
    
    // CHALLENGE - 6
    if (req.query.hasOwnProperty('nombre')) {
        var personajes = await personajesServices.getNombre(req.query.nombre);
    }
    
    // CHALLENGE - 6
    if (req.query.hasOwnProperty('edad')) {
        var personajes = await personajesServices.getEdad(req.query.edad);
    }

    // CHALLENGE - 6
    if (req.query.hasOwnProperty('movies')) {
        var personajes = await personajesServices.getPorPelis(req.query.movies);
    }
    
    // CHALLENGE - 5 (Si mando 0 vienen todos con sus peliculas, si envio un nro. viene solo un personaje)
    if (req.query.hasOwnProperty('cual')) {
        console.log(req.query.cual);
        var personajes = await personajesServices.getDetallePersonaje(req.query.cual);
    }

    //return res.status(StatusCodes.OK).json(peliculas);
    console.log(personajes);
    return res.status(200).json(personajes);

});

//*******************
//PERSONAJES - INSERT
//*******************

// CHALLENGE - 4

router.post('' , verifytoken,async (req,res) => {
    console.log('Estoy en Personajes Insert');
    
    var personajes = await personajesServices.insert(req.body);
 
   //return res.status(StatusCodes.OK).json(peliculas);
   console.log(personajes);
   return res.status(200).json(personajes);
});

//*******************
//PERSONAJES - UPDATE
//*******************

// CHALLENGE - 4

router.put('' , verifytoken,async (req,res) => {
    console.log('Estoy en Personajes Update');
    
    var personajes = await personajesServices.update(req.body);
 
   //return res.status(StatusCodes.OK).json(peliculas);
   console.log(personajes);
   return res.status(200).json(personajes);
})


//*******************
//PERSONAJES - DELETE
//*******************

// CHALLENGE - 4

router.delete('' , verifytoken,async (req,res) => {
    console.log('Estoy en Personajes Delete');
    
    var personajes = await personajesServices.delete(req.body.id);
 
    //return res.status(StatusCodes.OK).json(peliculas);
    console.log(personajes);
    return res.status(200).json(personajes);
})

export default router;
