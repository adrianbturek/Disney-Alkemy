import {sequelize} from '../../dbconfig.js';
import mysql from 'mysql2/promise';
import {loginmodel} from '../models/Disney-Models.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

class Login {

    signup = async (request) => {
        let returnArray = null;
        const {nombre, apellido, mail, password} = request;

        console.log('Estoy en: Login.signup()');

        try {
            const salt = await bcrypt.genSalt(10);
            const newpass= await bcrypt.hash(password, salt);
            
            //await sequelize.authenticate();
            const rows = loginmodel.create({nombre:nombre,apellido:apellido,mail:mail,password:newpass});
    
            //SIN SEQUELIZE    
            //let pool   = await mysql.createConnection(config);
            //let [rows,fields] = await pool.execute("INSERT INTO Disney.Peliculas VALUES(NULL,?,?,?,?)",[titulo, fechacreacion, calificacion, idgenero]);
            //const token =  jwt.sign({id:loginmodel._id},process.env.SECRET,{
             //    expiresIn: 60*60*24  //un dia en segundos
            //});
            //returnArray = {auth:true,token:token};
            returnArray = rows;
        }
        catch (error) {
            console.log(error);
        }
 
        return returnArray;
    }

    me = async (request) => {
        let returnArray = null;

        console.log('Estoy en: Login.me()');
        console.log(request.userId);

        const usuario = await loginmodel.findByPk(request.userId,{attributes:['nombre','apellido','mail']});
           if (!usuario) {
              returnArray={message:'Usuario Inexistente'};
           } 
           console.log(usuario),
           returnArray=usuario;

           return returnArray;
        } 
    
    signin = async (request) => {
        let returnArray = null;

        console.log('Estoy en: Login.signin()');

        const {mail,password} = request;

        const rows = await loginmodel.findOne({ where: {mail: mail}});

        if (!rows) {
            returnArray = {message: 'Mail no existe'};
        } else {

            /*
            const salt = await bcrypt.genSalt(10);
            const PassIngresado= await bcrypt.hash(password, salt);
            */

            const compare = bcrypt.compareSync(password,rows.password);

            if (compare) {
                const token = jwt.sign({id: rows.id},process.env.SECRET,{
                    expiresIn: 60* 60 *24
                })
                returnArray = {auth: true, token, message: 'Mail y Password Correctas'};
            } else {
                returnArray = {message: 'Password Incorrecta'};
            }
        }
            return returnArray;
        } 
}

export default Login;