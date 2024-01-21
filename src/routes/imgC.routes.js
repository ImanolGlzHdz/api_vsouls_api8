
const { pool } = require("../db.js");

const { dirname } = require('path');
const { fileURLToPath } = require('url');
const { send } = require("process");

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
const imgC = express()

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../imgCliente/cImages'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('IMG_PERFIL')


imgC.post('/imgCliente/upload/:ID_USUARIO', fileUpload,(req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Error De Servidor');

        const IMG_PERFIL = fs.readFileSync(req.file.path);

        conn.query('CALL INSERTAR_IMAGEN_C(?, ?)', [req.params.ID_USUARIO, IMG_PERFIL], (err, rows) => {
            if (err) return res.status(500).send(err);

            // Elimina el archivo temporal después de leerlo
            fs.unlinkSync(req.file.path);

            res.json({ message: 'Imagen Guardada' });
        });
    });

    console.log(req.file);
})


/*

imgC.get('/imgCliente/get/:ID_USUARIO', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
          return res.status(500).send(`Error de conexión a la base de datos: ${err.message}`);
        }
    
        // Obtén el ID del usuario específico para el que deseas obtener las imágenes
        const userId = req.params.ID_USUARIO;

        conn.query('CALL MOSTRAR_IMAGEN_C1(?)', [userId], (err, rows) => {
          if (err) {
            return res.status(500).send(`Error al ejecutar la consulta: ${err.message}`);
          }
          console.log('Rows from the database:', rows);
    
          const dbImageDir = path.join(__dirname, '../dbCImages/');
  
          const defaultImagePath = path.join(__dirname, '../defaultImages/iconoUsuario.png');
    
          // Elimina solo las imágenes asociadas al usuario específico
          fs.readdirSync(dbImageDir).forEach(file => {
            if (file.startsWith(userId + '-')) {
              fs.unlinkSync(path.join(dbImageDir, file));
            }
          });

          rows[0].forEach(img => {
            if (img && img.ID_USUARIO) {
              if (img.IMG_PERFIL) {
                // Si IMG_PERFIL no es null, guarda la imagen normalmente
                fs.writeFileSync(path.join(dbImageDir, img.ID_USUARIO + '-monkeywit.png'), img.IMG_PERFIL);
              } else {
                // Si IMG_PERFIL es null, guarda la imagen predeterminada
                const defaultImageBuffer = fs.readFileSync(defaultImagePath);
                fs.writeFileSync(path.join(dbImageDir, img.ID_USUARIO + '-monkeywit.png'), defaultImageBuffer);
              }
            } else {
              console.error('Datos de imagen incompletos o no válidos:', img);
              console.error(img.ID_USUARIO);
              console.error(img.IMG_PERFIL);
            }
          });
    
          const imagedir = fs.readdirSync(dbImageDir);
          res.json(imagedir);
          console.log(imagedir)
        });
      });
});


imgC.get('/imgCliente/get/:ID_USUARIO', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send(`Error de conexión a la base de datos: ${err.message}`);
    }

    const userId = req.params.ID_USUARIO;

    conn.query('CALL MOSTRAR_IMAGEN_C1(?)', [userId], (err, rows) => {
      if (err) {
        return res.status(500).send(`Error al ejecutar la consulta: ${err.message}`);
      }

      const dbImageDir = path.join(__dirname, '../dbCImages/');
      const defaultImagePath = path.join(__dirname, '../defaultImages/iconoUsuario.png');

      if (rows[0].length > 0 && rows[0][0].IMG_PERFIL) {
        const img = rows[0][0];
        fs.writeFileSync(path.join(dbImageDir, `${userId}-monkeywit.png`), img.IMG_PERFIL);
        res.json([`${userId}-monkeywit.png`]);
      } else {
        // Si no hay imagen asociada al usuario, devuelve la imagen predeterminada
        const defaultImageBuffer = fs.readFileSync(defaultImagePath);
        fs.writeFileSync(path.join(dbImageDir, `${userId}-monkeywit.png`), defaultImageBuffer);
        res.json([`${userId}-monkeywit.png`]);
      }
    });
  });
});*/


const dbImageDir = path.join(__dirname, '../imgCliente/dbCImages/');
const defaultImageDir = path.join(__dirname, '../imgCliente/defaultImages/');

// Middleware para servir archivos estáticos desde las carpetas
//imgC.use('/imgCliente', express.static(imgCliente));
imgC.use('/dbCImages', express.static(dbImageDir));
imgC.use('/defaultImages', express.static(defaultImageDir));

imgC.get('/imgCliente/get/:ID_USUARIO', (req, res) => {
  console.log('obtener img user')
  req.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send(`Error de conexión a la base de datos: ${err.message}`);
    }

    const userId = req.params.ID_USUARIO;

    conn.query('CALL MOSTRAR_IMAGEN_C1(?)', [userId], (err, rows) => {
      if (err) {
        return res.status(500).send(`Error al ejecutar la consulta: ${err.message}`);
      }

      if (rows[0].length > 0 && rows[0][0].IMG_PERFIL) {
        const img = rows[0][0];
        fs.writeFileSync(path.join(dbImageDir, `${userId}-monkeywit.png`), img.IMG_PERFIL);
        res.json([`/dbCImages/${userId}-monkeywit.png`]);
      } else {
        // Si no hay imagen asociada al usuario, devuelve la ruta de la imagen predeterminada
        res.json([`defaultImages/iconoUsuario.png`]);
      }
    });
  });
});




module.exports = imgC;