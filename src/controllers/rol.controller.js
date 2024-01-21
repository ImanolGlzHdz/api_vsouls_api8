const { pool } = require("../db.js");

exports.getRol = async (req, res) => {
   try {
       const [rows] = await pool.query("CALL MOSTRAR_ROL()");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


exports.postRol = async (req, res) => {
    const {NOMBRE, DESCRIPCION} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_ROL(?, ?)", [NOMBRE, DESCRIPCION]);
       res.send('Rol insertado')
       console.log('Rol Insertado')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.putRol = async (req, res) => {
    const {ID_ROL, NOMBRE, DESCRIPCION} = req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_ROL(?,?, ?)", [ID_ROL, NOMBRE, DESCRIPCION]);
       res.send('ROL ACTUALIZADO')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.deleteRol = async (req, res) => {
    const {ID_ROL} =req.body
   try {
       const [rows] = await pool.query(" CALL ELIMINAR_ROL(?)",[ID_ROL]);
       res.send('Rol Eliminado')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

// ROL ID --------------------------------------

exports.getRolId = async (req, res) => {
    const {id} =req.params
    try {
        const [rows] = await pool.query("CALL MOSTRAR_ROL_ID(?)", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

