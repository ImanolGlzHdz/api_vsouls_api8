const { pool } = require("../db.js");

exports.getOfertaC = async (req, res) => {
   try {
       const [rows] = await pool.query("CALL MOSTRAR_OFERTA_C()");
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.getOfertaReciente = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL MOSTRAR_OFERTA_NEW()");
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
