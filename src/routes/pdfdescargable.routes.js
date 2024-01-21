const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('../db.js');

const router = express.Router();

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../pdfs'),  // Cambiar a la carpeta donde deseas almacenar los archivos PDF
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const pdfUpload = multer({
    storage: diskStorage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no permitido. Solo se permiten archivos PDF.'));
        }
    }
}).single('pdf');  // Cambiar 'pdf' al nombre del campo del formulario

router.post('/pdf/post', pdfUpload, async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const tipo = req.file.mimetype;
            const name = req.file.originalname;
            const data = fs.readFileSync(path.join(__dirname, '../pdfs/' + req.file.filename));

            const [rows] = await conn.query('INSERT INTO catalogo SET ?', [{ tipo, name, data }]);
            res.send('PDF guardado correctamente');
            console.log('PDF agregado');
        } finally {
            // Release the connection back to the pool
            conn.release();
        }
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/pdf/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM catalogo WHERE NAME = ?', [id]);
        const rutaArchivo = './pdfsget/' + id;

        fs.unlink(rutaArchivo, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            } else {
                console.log('Archivo eliminado correctamente.');
            }
        });

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'PDF no encontrado o ya eliminado' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar el PDF:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/pdf/get', async (req, res) => {
    try {
        const conn = await pool.getConnection();

        try {
            const [rows] = await conn.query('SELECT * FROM catalogo');

            rows.forEach(publicidad => {
                const pdfPath = path.join(__dirname, '../pdfsget', publicidad.NAME);
                fs.writeFileSync(pdfPath, publicidad.DATA);
            });

            const pdfDir = fs.readdirSync(path.join(__dirname, '../pdfsget'));

            res.json(pdfDir);

            // Puedes descomentar la línea siguiente para ver los PDFs en la consola
            // console.log(fs.readdirSync(path.join(__dirname, '../pdfs')));
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
