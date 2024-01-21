const { pool } = require("../db.js");

exports.getRoutes = async (req, res) => {
   try {
       const [rows] = await pool.query("CALL MOSTRAR_USUARIO()");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


exports.postRoutes = async (req, res) => {
    const {CORREO, PASSWORD} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_USUARIO(?,?)", [CORREO, PASSWORD]);
       res.json(rows)
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.putRoutes = async (req, res) => {
    const {ID_USUARIO, PASSWORD_A, PASSWORD_N} = req.body
   try {
       const [rows] = await pool.query("CALL CAMBIAR_CONTRA_USUARIO(?,?, ?)", [ID_USUARIO, PASSWORD_A, PASSWORD_N]);
       res.send('Contraseña Actualizada');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.deleteRoutes = async (req, res) => {
    const {ID_USUARIO} =req.body
   try {
       const [rows] = await pool.query("CALL ELIMINAR_USUARIO(?)",[ID_USUARIO]);
       res.send('Usuario Eliminado');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

