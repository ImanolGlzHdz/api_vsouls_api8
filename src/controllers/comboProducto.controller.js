const { pool } = require("../db.js");

exports.getCmbProducto = async (req, res) => {
   try {
       const [rows] = await pool.query("CALL MOSTRAR_PROD()");
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}