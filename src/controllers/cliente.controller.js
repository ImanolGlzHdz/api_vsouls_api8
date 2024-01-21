const { pool } = require("../db.js");

exports.getUsuario = async (req, res) => {
    const {P_ID_USUARIO} =req.params
   try {
       const [rows] = await pool.query("CALL MOSTRAR_CLIENTE(?)", [P_ID_USUARIO]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.postCorreos = async (req, res) => {
    const {CORREO} =req.body
    try {
        const [rows] = await pool.query("CALL CORREO(?)", [CORREO]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.postUsuario = async (req, res) => {
    const {ID_USUARIO, RFC, NOMBRE, APE1, APE2, TELEFONO, CP, ESTADO, 
        MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, CALLESUPERIOR,
        CALLEINFERIOR, REFERENCIA} =req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_REGISTRO(?,?,?, ?, ?, ?, ?, ?, ?,?, ?,?, ?, ?, ?,?)",[ID_USUARIO, RFC, NOMBRE, APE1, APE2, TELEFONO, CP, ESTADO, 
        MUNICIPIO, COLONIA, CALLE, NO_EXTERIOR, NO_INTERIOR, CALLESUPERIOR,
        CALLEINFERIOR, REFERENCIA]);
       res.send('Registro insertado');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.ActualizarPerfil = async (req, res) => {
    //const {ID_USUARIO, RFC, NOMBRE, APE1, APE2, TELEFONO} = req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_PERFIL(?,?,?,?, ?,?)",
       [req.body.ID_USUARIO, req.body.RFC, req.body.NOMBRE, req.body.APE1, 
        req.body.APE2, req.body.TELEFONO]);
        res.send('CLIENTE ACTUALIZADO');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


