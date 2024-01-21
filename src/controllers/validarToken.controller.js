const { pool } = require("../db.js");


exports.postvalidarToken = async (req, res) => {
    const {CORREO, TOKEN, PASSWORD} = req.body
   try {
       const [rows] = await pool.query("CALL VALIDAR_TOKEN(?, ?, ?)", [CORREO, TOKEN, PASSWORD]);
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

