
const { pool } = require("../db.js");

const { dirname } = require('path');
const { fileURLToPath } = require('url');
const { send } = require("process");

const express = require('express')
const carrucel = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const router = express.Router()

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//const carrucel = Router()

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../imgCarrucelC/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-monkeywit-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')


carrucel.post('/carrucel', fileUpload,(req, res) => {

    req.getConnection ((err, conn)=>{
        if(err) return res.status(500).send('Error De Servidor')
        
        const type = req.file.mimetype
        const name = req.file.originalname
        const P_IMAGEN_C = fs.readFileSync(path.join(__dirname, '../imgCarrucelC/images/'+ req.file.filename))
            
            conn.query('CALL INSERTAR_CARRUCEL_C(?, ?, ?);', 
             [type, name, P_IMAGEN_C], 
             (err, rows)=>{
            
                if (err) return res.status(500).send(err);

                res.send('Imagen Guardada')
            })
    })

    console.log(req.file)
})


carrucel.delete('/carrucel/delete/:P_ID_CARRUCEL_C', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return res.status(500).send('Error de servidor');
      }
  
      conn.query('CALL ELIMINARR_CARRUCEL_C(?)', [req.params.P_ID_CARRUCEL_C], (err, rows) => {
        if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).send('Error de servidor');
        }
  
        try {
          fs.unlinkSync(path.join(__dirname, '../imgCarrucelC/dbimages/', req.params.P_ID_CARRUCEL_C + '-monkeywit.png'));
          res.send('Imagen Eliminada');
        } catch (unlinkErr) {
          console.error('Error al eliminar el archivo:', unlinkErr);
          return res.status(500).send('Error al eliminar la imagen');
        }
      });
    });
  });


carrucel.get('/carrucel/get', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Error De Servidor');

        conn.query('CALL MOSTRAR_CARRUCEL_C()', (err, rows) => {
            if (err) return res.status(500).send('Error De Servidor');

            // Eliminar imágenes existentes en la carpeta dbimages
            const dbImageDir = path.join(__dirname, '../imgCarrucelC/dbimages/');
            fs.readdirSync(dbImageDir).forEach(file => {
                fs.unlinkSync(path.join(dbImageDir, file));
            });

            // Guardar las imágenes en la carpeta dbimages
            rows[0].forEach(img => {
                fs.writeFileSync(path.join(dbImageDir, img.ID_CARRUCEL_C + '-monkeywit.png'), img.IMAGEN_C);
            });

            // Devuelve la lista actualizada de imágenes
            const imagedir = fs.readdirSync(dbImageDir);
            res.json(imagedir);
        });
    });
    
})

module.exports = carrucel;