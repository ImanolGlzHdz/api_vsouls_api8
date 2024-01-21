const { pool } = require("../db.js");


exports.postMostrarUsuarios = async (req, res) => {
    const {P_T_ROL} = req.body
   try {
       const [rows] = await pool.query("CALL MOSTRAR_REGISTRO_FIL_ADMIN(?)", [P_T_ROL]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
