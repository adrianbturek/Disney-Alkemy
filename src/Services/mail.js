import sgMail from '@sendgrid/mail'
import 'dotenv/config';

class mail {

    bienvenido = async (request) => {    
         sgMail.setApiKey(process.env.API_Mail);

  sgMail
    .send(request)
    .then(() => {
      console.log('Email enviado')
    })
    .catch((error) => {
      console.error(error)
    })
}}

export default mail;