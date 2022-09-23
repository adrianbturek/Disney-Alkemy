import {sequelize} from '../../dbconfig.js';
import mysql from 'mysql2/promise';
import {peliculasmodel} from '../models/Disney-Models.js'

class Disney {

    // CHALLENGE - 7

    getAll = async () => {
        let returnArray = null;
        console.log('Estoy en: Disney.getAll()');
        
        try {
            //throw new Error('Query failed');

            await sequelize.authenticate();
            const rows = await peliculasmodel.findAll({attributes:["imagen","titulo","fecha_creacion"]});
            
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("SELECT * from Disney.peliculas");
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
            throw new error('Error en GetAll');
        }

        return returnArray;
    }
    
    // CHALLENGE - 10
    getTitulo = async (paramtitulo) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getTitulo()');
        try {
            await sequelize.authenticate();
            const rows = await peliculasmodel.findAll({ where: { titulo: paramtitulo } });
            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("SELECT * From Peliculas where titulo=?",[titulo]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 10
    getGenero = async (genero) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getGenero()');
        try {
            await sequelize.authenticate();
            const rows = await peliculasmodel.findAll({ where: { idgenero: 1 } });

            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("CALL PeliculasxGenero(?)",[genero]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 10
    getOrder = async (order) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getOrder()');
        try {
            await sequelize.authenticate();
            const rows = await peliculasmodel.findAll({ order: [["titulo", order]]});

            //SIN SEQUELIZE
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute(`Select * From Peliculas Order By titulo ${[order]}`);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 8 (Si mando 0 vienen todos con sus personajes, si envio un nro. viene solo una pelicula)
    getDetallePeli = async (parampeli) => {
        let returnArray = null;
        console.log('Estoy en: Disney.getDetallePeli()');
        try {
            await sequelize.authenticate();
            const rows = await sequelize.query('CALL DetallePeliculas (:pelicula)', {replacements:{pelicula:parampeli}})
            
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

    // CHALLENGE - 9
    insert = async (ObjectInsert) => {
        let returnArray = null;
        const {titulo, fechacreacion, calificacion, idgenero} = ObjectInsert;

        console.log('Estoy en: Disney.insert()');
        try {
            //await sequelize.authenticate();
            const rows = peliculasmodel.create({titulo:titulo,fecha_creacion:fechacreacion,calificacion:calificacion,idgenero:idgenero});
    
            //SIN SEQUELIZE    
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("INSERT INTO Disney.Peliculas VALUES(NULL,?,?,?,?)",[titulo, fechacreacion, calificacion, idgenero]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // CHALLENGE - 9
    update = async (ObjectUpdate) => {
        let returnArray = null;
        const {id, titulo, fechacreacion, calificacion, idgenero} = ObjectUpdate;

        console.log('Estoy en: Disney.update()');

        //ESTA ES DE UNA MANERA CON SEQUELIZE
        try {
            // Esta es una manera
            const rows = peliculasmodel.update({titulo:titulo,fecha_creacion:fechacreacion,calificacion:calificacion,idgenero:idgenero},{where: {id:id}});
            
            //SIN SEQUELIZE   
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("UPDATE Disney.Peliculas SET Titulo=?,Fecha_Creacion=?,Calificacion=?,Idgenero=? WHERE Id=?",[titulo, fechacreacion, calificacion, idgenero, id]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }

        return returnArray;

        /*
        // OTRA MANERA CON SEQUELIZE
        const peliculasmodel2 = await peliculasmodel.findOne({ where: {id:id}}); 
        peliculasmodel2.titulo=titulo; 
        peliculasmodel2.fecha_creacion=fechacreacion;
        peliculasmodel2.calificacion=calificacion;
        peliculasmodel2.idgenero=idgenero;
        try {
            const rows = await peliculasmodel2.save();
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
        */
    };

    // CHALLENGE - 9
    delete = async (id) => {
        let returnArray = null;
        
        console.log('Estoy en: Disney.delete()');

        try {
            const rows = peliculasmodel.destroy({where: {id:id}});

            //SIN SEQUELIZE   
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute('DELETE FROM Disney.Peliculas WHERE id=?',[id]);
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

}

export default Disney;