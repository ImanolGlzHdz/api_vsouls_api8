const express  = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const { pool } = require("../db.js");

const correo = express();
correo.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vsouls.suplementos@gmail.com',
    pass: 'gecl uyss ovyt tuvq'
  }
});

correo.post('/correo/enviar-correo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        let { P_CORREO } = req.body; // Utilizando destructuring
        let asunto = 'Recuperación de Contraseña Vsouls';
        //let mensaje = '!Hola! \n Estimado Usuario, \nEsperamos que este mensaje le encuentre bien. Para mantener la seguridad de su cuenta, le solicitamos que actualice su contraseña.\nHaga clic en el siguiente enlace para iniciar el proceso de actualización de contraseña:\n Actualizar Contraseña \nPor favor, asegúrese de tener su token de seguridad a la mano, ya que se le solicitará durante el proceso. Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.\nGracias por su cooperación.\nAtentamente,\nVsouls';
        let mensaje = `¡Hola!\n
            Estimado Usuario,\n
            Esperamos que se encuentre bien. Para continuar con el proceso le solicitamos que la actualice su contraseña.\n
            Haga clic en el siguiente http://localhost:3000/RecuperarContrasena para iniciar el proceso de actualización de contraseña.\n
            Por favor, asegúrese de tener su token de seguridad a la mano, ya que se le solicitará durante el proceso.\n
            Gracias por su cooperación.\n
            Atentamente,\n
            Vsouls`;


        const mailOptions = {
            from: 'Vsouls',
            to: P_CORREO,
            subject: asunto,
            text: mensaje
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Correo enviado: ' + info.response);
        });
    });
});



module.exports = correo;