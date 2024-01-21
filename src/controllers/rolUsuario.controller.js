const { pool } = require("../db.js");

exports.getRolUsuario = async (req, res) => {
    const {P_ID_USUARIO} =req.params
    try {
        const [rows] = await pool.query("CALL ROL_USUARIO(?)", [P_ID_USUARIO]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }