import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

function verifytoken (req,res, next) {

    console.log('VERIFY',req.path);
  
    if (req.path=="/public" || req.path=="/auth/signup" || req.path=="/auth/signin"){
        next();
    }
    
    /*
    if (req.userId===undefined){
        console.log("El usuario no ingresó")
        resp.status(401)
    }
*/

    const token = req.headers['x-access-token'];
    let returnArray = null;

    if (!token) {
        return res.status(401).send({
            auth:false,
            message: 'No tiene Token'             
     })
    }

     const decodificado = jwt.verify(token,process.env.SECRET);
     console.log('verify',decodificado.id)
     req.userId = decodificado.id;
     next();
}

//module.exports = verifytoken;

export default verifytoken;
