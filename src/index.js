import express from 'express';

//instalamos nodemon para no tener que cortar todo el tiempo el servidor
import nodemo from 'nodemon';
import PeliculasRouter from './routes/Peliculas.js';
import PersonajesRouter from './routes/Personajes.js';
import LoginRouter from './routes/login.js';
import verifytoken from './routes/verifytoken.js'

const app = express();

//settings
/*
app.set('port',3000); 

esta es una manera de proponer 3000 pero generalmente 
los ervers en la nube nos dan un puerto entonces podemos usar otra cosa
*/
// esto es decirle tomamos el que nos dan y sino hay ninguno tomamos el 3000)
app.set('port', process.env.port || 3000);

//middleware
app.use(express.urlencoded({extended:false})); // Para el login
app.use(express.json());

//app.use(verifytoken);
app.use('/characters',PersonajesRouter);
app.use('/movies',PeliculasRouter);
app.use('/auth',LoginRouter);
app.use('/public',LoginRouter);


/*
app.use((error,req,res,next) => {
    res.status(400).JSON({
        staus:"Error",
        message: error.message
    })
   })
*/

app.listen(app.get('port'), () => {
    console.log('escuchando por puerto ',app.get('port'));
})
