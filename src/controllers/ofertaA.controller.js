const { pool } = require("../db.js");

exports.getOfertaA = async (req, res) => {
   try {
       const [rows] = await pool.query("CALL MOSTRAR_OFERTA_A()");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.postOfertaA = async (req, res) => {
    const {NOMBRE_OFERTA, NOMBRE_P, PORCENTAJE_DE_OFERTA, 
        FECHA_INICIO, FECHA_FIN} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_OFERTA(?,?,?,?, ?)", [NOMBRE_OFERTA, NOMBRE_P, PORCENTAJE_DE_OFERTA, 
        FECHA_INICIO, FECHA_FIN]);
        res.send('OFERTA INSERTADA');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.putOfertaA = async (req, res) => {
    const {ID_OFERTA, NOMBRE_OFERTA, NOMBRE_P, 
        PORCENTAJE_DE_OFERTA, FECHA_INICIO, FECHA_FIN} = req.body
   try {
       const [rows] = await pool.query("CALL ACTUALIZAR_OFERTA_A(?,?,?,?,?,?)", [ID_OFERTA, NOMBRE_OFERTA, NOMBRE_P, 
        PORCENTAJE_DE_OFERTA, FECHA_INICIO, FECHA_FIN]);
        res.send('REGISTRO ACTUALIZADO');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.deleteOfertaA = async (req, res) => {
    const {ID_OFERTA} =req.body
   try {
       const [rows] = await pool.query("CALL ELIMINAR_OFERTA_ID(?)",[ID_OFERTA]);
       res.send('REGISTRO ELIMINADO');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

