const express =require("express");
const morgan =require("morgan");
const mercadopago = require('mercadopago');
const path = require('path');
const cors = require('cors');

const productos= require('./routes/productos.routes.js');
const review = require('./routes/review.routes.js');
const rutaProductsImg = require('./routes/rutaProductsImg.routes.js');
const favoritos = require('./routes/favoritos.routes.js');
const misCompras = require('./routes/compras.cliente.routes.js');

const nivelesrutas = require('./routes/niveles.routes.js');
const publicidadruta = require('./routes/rutapublicidad.routes.js');
const monedas = require('./routes/monedas.routes.js');
const paquetes = require('./routes/paquetes.routes.js');
const socios = require('./routes/socios.routes.js');
const foro = require('./routes/foro.routes.js');
const carrito = require('./routes/carritocompras.routes.js');
const primeravez = require('./routes/primeravez.routes.js');
const ventas = require('./routes/ventas.routes.js');

const carritoclient = require('./routes/carrritoclient.routes.js');
const hisorialadmin = require('./routes/historialadmin.routes.js');
const validacionventa = require('./routes/validacionventa.routes.js');
const statusventa = require('./routes/statusventa.routes.js');
const ventaexitosa = require('./routes/ventaexitosa.routes.js');

const usuario = require('./routes/usuario1.routes.js');
const cliente = require('./routes/cliente.routes.js');
const vUsuario = require('./routes/vUsuario.routes.js');
const rol = require('./routes/rol.routes.js');
const direccion = require('./routes/direccion.routes.js');
const registroA = require('./routes/registroAdmin.routes.js');
const mostrar1Registro = require('./routes/mostrar1Registro.routes.js');
const ofertaC = require('./routes/ofertaC.routes.js');
const ofertaA = require('./routes/ofertaA.routes.js');
const mostrarOfertaId = require('./routes/mostrarOfertaId.routes.js');
const token = require('./routes/obtnerToken.routes.js');
const validarToken  = require('./routes/validarToken.routes.js');
const cmbProducto = require('./routes/comboProducto.routes.js');
const mostrarUsuariosA  = require('./routes/mostrarUsuariosA.routes.js');
const carrucel  = require('./routes/carrucel.routes.js');
const imgC = require('./routes/imgC.routes.js');
const correo = require('./routes/correo.routes.js');
const buscador = require('./routes/buscador.routes.js');
const vendedor = require('./routes/vendedor.routes.js');
const rolUsuario = require('./routes/rolUsuario.routes.js');
const chat = require('./routes/chat.routes.js');
const ventampsocios = require('./routes/venta_mercadopago.routes.js');
const pdfdescargable = require('./routes/pdfdescargable.routes.js')

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})
// Routes

app.use('/publicidad',express.static(path.join(__dirname,'dbimages/publicidad')))
app.use(express.static(path.join(__dirname, 'dbimages')))

app.use('/pdf',express.static(path.join(__dirname,'pdfsget')))

app.use(productos)
app.use(review)
app.use(rutaProductsImg)
app.use(favoritos)
app.use(misCompras)

app.use(publicidadruta)
app.use(nivelesrutas)
app.use(monedas)
app.use(paquetes)
app.use(socios)
app.use(foro)
app.use(carrito)
app.use(primeravez)
app.use(ventas)

app.use(carritoclient);
app.use(hisorialadmin);
app.use(validacionventa);
app.use(statusventa);
app.use(ventaexitosa);

app.use(express.static(path.join(__dirname,'imgCarrucelC')))
app.use(express.static(path.join(__dirname,'imgCliente')))
app.use(express.static(path.join(__dirname, 'dbimages')))
app.use(express.static(path.join(__dirname, 'dbCImages')))
app.use(express.static(path.join(__dirname, 'defaultImages')))

app.use(usuario);
app.use(cliente);
app.use(vUsuario);
app.use(rol);
app.use(direccion);
app.use(registroA);
app.use(mostrar1Registro);
app.use(ofertaC);
app.use(ofertaA);
app.use(mostrarOfertaId);
app.use(token);
app.use(validarToken);
app.use(cmbProducto);
app.use(mostrarUsuariosA);
app.use(carrucel);
app.use(correo);
app.use(imgC);
app.use(buscador);
app.use(vendedor);
app.use(rolUsuario);
app.use(chat);
app.use(ventampsocios);
app.use(pdfdescargable);


mercadopago.configure({
  access_token: 'APP_USR-8597786470743959-011212-3e35418f85b7f20ed02216e6167ed0eb-559880536',
});

app.get('/mercadopago', (req, res) => {
res.send('El servidor de MercadoPago funciona! :)');
});

app.post("/mercadopago/create_preference", (req, res) => {
// const {id} = req.params
// console.log(id, 'mercadopago')
let preference = {
  items: [
    {
      title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
    },
    ],
      back_urls: {
      success: `http://localhost:3000/venta-exitosa`,
      failure: `http://localhost:3000/venta-fallida`,
      },
    auto_return: "approved",
    binary_mode: true,
};
  
    mercadopago.preferences
    .create(preference)
    .then(function (response) {
    res.json({
    id: response.body.id,
    });
     })
    .catch(function (error) {
     console.log(error);
    });
  });

app.post("/mercadopago/create_preference/socios", (req, res) => {
// const {id} = req.params
// console.log(id, 'mercadopago')
let preference = {
  items: [
    {
      title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
    },
    ],
      back_urls: {
      success: `http://localhost:3000/venta-exitosa-socios`,
      failure: `http://localhost:3000/venta-fallida-socios`,
      },
    auto_return: "approved",
    binary_mode: true,
};
  
    mercadopago.preferences
    .create(preference)
    .then(function (response) {
    res.json({
    id: response.body.id,
    });
     })
    .catch(function (error) {
     console.log(error);
    });
  });
  
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;