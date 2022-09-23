import {sequelize} from '../../dbconfig.js';
import mysql from 'mysql2/promise';
import {personajesmodel} from '../models/Disney-Models.js'

class Disney {
    // CHALLENGE - 3 
    getAll = async () => {
        let returnArray = null;
        console.log('Estoy en: Disney.getAll()');
        try {
            await sequelize.authenticate();
            const rows = await personajesmodel.findAll({attributes:["imagen","nombre"]});
            
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("SELECT * from Disney.personajes");
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 6
    getNombre = async (paramnombre) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getNombre()');
        try {
            await sequelize.authenticate();
            const rows = await personajesmodel.findAll({ where: { nombre: paramnombre } });

            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("SELECT * From Personajes where nombre=?",[nombre]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 6
    getEdad = async (paramedad) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getEdad()');
        try {
            await sequelize.authenticate();
            const rows = await personajesmodel.findAll({ where: { edad: paramedad } });
    
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("SELECT * From Personajes where edad=?",[edad]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 6
    getPorPelis = async (parampeli) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getPorPelis()');
        try {
            await sequelize.authenticate();
            const rows = await sequelize.query('CALL PersonajesxPelicula (:peli)', {replacements:{peli:parampeli}})
              
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('CALL PersonajesxPelicula(?)',[peli]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 5 (Si mando 0 vienen todos con sus peliculas, si envio un nro. viene solo un personaje)
    getDetallePersonaje = async (parampersonaje) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getDetallePersonaje()');
        try {
            await sequelize.authenticate();
            const rows = await sequelize.query('CALL DetallePersonaje2 (:personaje)', {replacements:{personaje:parampersonaje}})
            
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('CALL DetallePersonaje(?)',[detalle]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 4
    insert = async (ObjectInsert) => {
        let returnArray = null;

        const {nombre, imagen, edad, peso, historia} = ObjectInsert;

        console.log('Estoy en: Disney.insert()');
        try {
            const rows = personajesmodel.create({nombre:nombre,imagen:imagen,edad:edad,peso:peso,historia:historia});

            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('INSERT INTO Disney.Personajes VALUES(NULL,?,?,?,?,?)',[nombre, imagen, edad, peso, historia]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 4
    update = async (ObjectInsert) => {
        let returnArray = null;

        const {id,nombre, imagen, edad, peso, historia} = ObjectInsert;

        console.log('Estoy en: Disney.update()');
        try {
            const rows = personajesmodel.update({nombre:nombre,imagen:imagen,edad:edad,peso:peso,historia:historia},{where: {id:id}});

            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('UPDATE Disney.Personajes SET nombre=?,imagen=?,edad=?,peso=?,historia=? WHERE Id=?',[nombre, imagen, edad, peso, historia, id]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 4
    delete = async (id) => {
        let returnArray = null;
        
        console.log('Estoy en: Disney.delete()');

        try {

            const rows = personajesmodel.destroy({where: {id:id}});

            //SIN SEQUELIZE   
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('DELETE FROM Disney.Personajes WHERE id=?',[id]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

}

export default Disney;