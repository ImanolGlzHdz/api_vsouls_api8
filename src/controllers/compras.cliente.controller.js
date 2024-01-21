const { pool } = require('../db.js');

const getmisComprasCliente = async (req, res) => {
        const {ID_USUARIO} = req.params
    try {
        const [rows] = await pool.query("call sp_get_misCompras(?)",[ID_USUARIO]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getmisComprasCliente,
};