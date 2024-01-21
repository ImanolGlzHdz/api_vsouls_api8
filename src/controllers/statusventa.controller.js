const { pool } = require('../db.js');

exports.verStatusVenta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL VerStatusVenta(?)", [req.params.status]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.agregarGuiaVenta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL AgregarGuiaVenta(?, ?)", [req.params.idVenta, req.params.numGuia]);
        res.send('guia ingresada correctamente')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
