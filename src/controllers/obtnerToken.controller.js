const { pool } = require("../db.js");


exports.postObtenerToken = async (req, res) => {
    const {P_CORREO} = req.body
   try {
       const [rows] = await pool.query("CALL RECUPERAR_CONTRA_C(?)", [P_CORREO]);
            if (Array.isArray(rows) && rows.length > 0) {
                // Envía el primer elemento del array como respuesta JSON
                res.json(rows[0]);
            } else {
                // Si no hay resultados, envía un mensaje adecuado
                res.json({ message: 'No se encontraron resultados' });
            }
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
