import { query } from 'express';
import  express from 'express';
const router = express.Router();

import Envioemail from '../Services/mail.js';
const envioemail = new Envioemail();

import LoginServices from '../Services/Login-Services.js';
const loginServices = new LoginServices();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import verifytoken from '../routes/verifytoken.js'
import mail from '@sendgrid/mail';


//**************
//LOGIN Registro
//**************
router.post('/signup', async (req, res) => {
    console.log('Estoy en SignUp');
    
    var login = null;

    var login = await loginServices.signup(req.body);

    const token =  await jwt.sign({id:login.id},process.env.SECRET,{
        expiresIn: 60*60*24  //un dia en segundos
        });

    login = {auth:true,token:token};

    const datosmail = {
            to: 'adrianbturek@gmail.com', // Change to your recipient
            from: 'adrianbturek@gmail.com', // Change to your verified sender
            subject: 'Bienvenido oal Proyecto Disney',
            text: 'Le damos la Bienvenida al Proyecto Disney',
            html: '<strong>HOLA</strong>'
        }      

    var mail = await envioemail.bienvenido(datosmail);

    console.log(login);
    res.status(200).json(login);
    }
);

//***************
//LOGIN Consultas
//***************
router.post('/signin', async (req, res) => {
    console.log('Estoy en SignIn');
    
    var login = null;

    var login = await loginServices.signin(req.body);

    console.log(login);
    res.json(login);
    }
);

router.get('/me', verifytoken, async (req, res) => {
    console.log('Estoy en Me');
    
    var login = null;

    console.log(req.userId);

    var login = await loginServices.me(req);

    console.log("LOGIN !!!!!!!",login);
    res.json(login);

    }
);

export default router;
