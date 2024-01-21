const { pool } = require("../db.js");

const getBuscador = async (req, res) => {
    const {P_QUERY} = req.params
   try {
       const [rows] = await pool.query("CALL BUSCADOR(?)",[P_QUERY]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

module.exports = {
    getBuscador
};