const { pool } = require("../db.js");

exports.getDireccion = async (req, res) => {
    const {ID_DIRECCION} =req.params
   try {
       const [rows] = await pool.query("CALL MOSTRAR_DIRE(?)", [ID_DIRECCION]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.getDireccionUsuario = async (req, res) => {
    const {ID_USUARIO} =req.params
   try {
       const [rows] = await pool.query("CALL MOSTRAR_DIRECCION(?)", [ID_USUARIO]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.getTotalDirecciones = async (req, res) => {
    const {ID_USUARIO} =req.params
   try {
       const [rows] = await pool.query("CALL CONTAR_DIRECCION(?)", [ID_USUARIO]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.postDireccion = async (req, res) => {
    const {ID_USUARIO, CP, ESTADO, MUNICIPIO, COLONIA, CALLE, 
        NO_EXTERIOR, NO_INTERIOR, CALLESUPERIOR, CALLEINFERIOR, 
        REFERENCIA} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_DIRECCION(?, ?, ?, ?,?,?,?,?,?,?,?)", [ID_USUARIO, CP, ESTADO, MUNICIPIO, COLONIA, CALLE, 
        NO_EXTERIOR, NO_INTERIOR, CALLESUPERIOR, CALLEINFERIOR, 
        REFERENCIA]);
        res.send('Direccion insertada');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.putDireccion = async (req, res) => {
    const {ID_DIRECCION, CP, ESTADO, MUNICIPIO, 
        COLONIA, CALLE, NO_EXTERIOR, 
        NO_INTERIOR, CALLESUPERIOR, CALLEINFERIOR, 
        REFERENCIA} = req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_DIRECCION(?,?,?,?, ?,?, ?, ?,?,?,?)", [ID_DIRECCION, CP, ESTADO, MUNICIPIO, 
        COLONIA, CALLE, NO_EXTERIOR, 
        NO_INTERIOR, CALLESUPERIOR, CALLEINFERIOR, 
        REFERENCIA]);
        res.send('Direccion insertada');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.deleteDireccion = async (req, res) => {
    const {ID_DIRECCION} =req.body
   try {
       const [rows] = await pool.query("CALL ELIMINAR_DIRECCION(?)",[ID_DIRECCION]);
       res.send('Direccion Eliminada');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

