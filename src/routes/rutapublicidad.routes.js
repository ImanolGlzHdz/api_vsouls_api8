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

router.post('/publicidad/post', fileUpload, async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const tipo = req.file.mimetype;
            const name = req.file.originalname;
            const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename));

            const [rows] = await conn.query('INSERT INTO publicidad SET ?', [{ tipo, name, data }]);
            res.send('Imagen guardada correctamente');
            console.log('Imagen agregada');
        } finally {
            // Release the connection back to the pool
            conn.release();
        }
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/publicidad/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM publicidad WHERE NAME = ?', [id]);
        const rutaArchivo = './dbimages/publicidad/' + id;

        fs.unlink(rutaArchivo, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            } else {
                console.log('Archivo eliminado correctamente.');
            }
        });

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Imagen no encontrada o ya eliminada' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});


router.get('/publicidad/get', async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const [rows] = await conn.query('SELECT * FROM publicidad');

            rows.forEach(publicidad => {
                const imagePath = path.join(__dirname, '../dbimages/publicidad', publicidad.NAME);
                fs.writeFileSync(imagePath, publicidad.DATA);
            });

            const imageDir = fs.readdirSync(path.join(__dirname, '../dbimages/publicidad'));

            res.json(imageDir);

            // Puedes descomentar la línea siguiente para ver las imágenes en la consola
            // console.log(fs.readdirSync(path.join(__dirname, '../dbimages/publicidad')));
        } finally {
            // Release the connection back to the pool
            conn.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
