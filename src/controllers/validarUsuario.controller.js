const { pool } = require("../db.js");

exports.postVUsuario = async (req, res) => {
    const {CORREO, PASSWORD} = req.body
    console.log(CORREO, PASSWORD);
   try {
       const [results] = await pool.query("CALL VALIDAR_USUARIO(?,?)", [CORREO, PASSWORD]);
       //const result = results[0];

            // Puedes enviar el resultado como respuesta JSON
            res.json(results[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
