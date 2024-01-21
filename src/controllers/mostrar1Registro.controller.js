const { pool } = require("../db.js");


exports.post1Registro = async (req, res) => {
    const {ID_USUARIO, ID_DIRECCION} = req.body
   try {
       const [rows] = await pool.query("CALL MOSTRAR_REGISTRO_ADMIN(?, ?)", [ID_USUARIO, ID_DIRECCION]);
       res.json(rows)
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

