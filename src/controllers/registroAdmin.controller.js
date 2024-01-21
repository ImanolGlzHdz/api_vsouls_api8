const { pool } = require("../db.js");

exports.getRegistroAdmin = async (req, res) => {
    const {rol} =req.params
   try {
       const [rows] = await pool.query("CALL MOSTRAR_REGISTRO_FIL_ADMIN(?)", [rol]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


exports.postRegistroAdmin = async (req, res) => {
    const {CORREO, PASSWORD, ROL, RFC, NOMBRE, APE1, APE2, TELEFONO, 
        CP, ESTADO, MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, 
        CALLESUPERIOR, CALLEINFERIOR, REFERENCIA} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_REGISTRO_ADMIN(?, ? ,?,?,?,?, ?, ?, ?, ?, ?, ?,?, ?,?, ?, ?, ?)", [CORREO, PASSWORD, ROL, RFC, NOMBRE, APE1, APE2, TELEFONO, 
        CP, ESTADO, MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, 
        CALLESUPERIOR, CALLEINFERIOR, REFERENCIA]);
        res.send('Registro Administrador insertado')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.putRegistroAdmin = async (req, res) => {
    const {ID_USUARIO, ROL, RFC, NOMBRE, APE1, APE2, TELEFONO, ID_DIRECCION,
        CP, ESTADO, MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, 
        CALLESUPERIOR, CALLEINFERIOR, REFERENCIA} = req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_REGISTRO_ADMIN(?,? ,?,?,?,?, ?, ?, ?, ?, ?, ?,?, ?,?, ?, ?, ?)", [ID_USUARIO, ROL, RFC, NOMBRE, APE1, APE2, TELEFONO, ID_DIRECCION,
        CP, ESTADO, MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, 
        CALLESUPERIOR, CALLEINFERIOR, REFERENCIA]);
        res.send('REGISTRO ACTUALIZADO')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.deleteRegistroAdmin = async (req, res) => {
    const {ID_USUARIO, ID_DIRECCION} =req.body
   try {
       const [rows] = await pool.query(" CALL ELIMINAR_REGISTRO_ADMIN(?, ?)",[ID_USUARIO, ID_DIRECCION]);
       res.send('REGISTRO ELIMINADO');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

