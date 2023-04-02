var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var contactoModel = require('../models/contactoModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    isContacto:true});
  });

  /* descomentar esto si quiero guardar en la base de datos lo de contacto
router.post('/', function(req,res,next){
    contactoModel.insertContacto(req.body);
    res.render('contacto');
}); */

router.post('/',async(req,res, next) => {
var nombre = req.body.nombre;
var email = req.body.email;
var telefono = req.body.tel;
var mensaje = req.body.mensaje;

var obj = {
    to: 'flavia.ursino@gmail.com',
    subject: 'contacto desde la web',
    html:nombre + "se conecto a traves y quiere mas info a este correo " + email + ".<br> Ademas, hizo el siquiente comentario: "
    + mensaje + ". <br> Su telefono es: " + telefono
}



var transporter = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
)

var info = await transporter.sendMail(obj);

res.render('contacto', {
    isContacto:true,
    message: 'Mensaje enviado correctamente'
});

});


module.exports = router;
