const { pool } = require('../db.js');

exports.ObtenerHistorialAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL ObtenerVentasPorAnioYMeses(?, ?)", [req.params.anio, req.params.mes]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
