const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('../db.js');

const router = express.Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-monkeywit-' + file.originalname);
    }
});

const fileUpload = multer({
    storage: diskstorage
}).single('image');

router.post('/carrucel', fileUpload, async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const type = req.file.mimetype;
            const name = req.file.originalname;
            const P_IMAGEN_C = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename));

            const [rows] = await conn.query('CALL INSERTAR_CARRUCEL_C(?, ?, ?);', [type, name, P_IMAGEN_C]);

            if (rows.affectedRows > 0) {
                res.send('Imagen Guardada');
            } else {
                res.status(500).send('Error al guardar la imagen en la base de datos');
            }
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/carrucel/delete/:P_ID_CARRUCEL_C', async (req, res) => {
    try {
        const { P_ID_CARRUCEL_C } = req.params;
        const conn = await pool.getConnection();

        try {
            const [rows] = await conn.query('CALL ELIMINARR_CARRUCEL_C(?)', [P_ID_CARRUCEL_C]);

            if (rows.affectedRows > 0) {
                const imagePath = path.join(__dirname, '../images/', P_ID_CARRUCEL_C + '-monkeywit.png');
                fs.unlinkSync(imagePath);
                res.send('Imagen Eliminada');
            } else {
                res.status(404).json({ message: 'Imagen no encontrada o ya eliminada' });
            }
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error('Error al eliminar la imagen:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/carrucel/get', async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const [rows] = await conn.query('CALL MOSTRAR_CARRUCEL_C()');

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
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
