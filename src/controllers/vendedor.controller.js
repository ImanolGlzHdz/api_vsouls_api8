const { pool } = require("../db.js");

exports.getVendedor = async (req, res) => {
    const {P_ID_USUARIO} =req.params
   try {
       const [rows] = await pool.query("CALL LINK_CLIENTE(?)", [P_ID_USUARIO]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.postVendedor = async (req, res) => {
    const {P_ID_CLIENTE, P_ID_VENTA} = req.body
   try {
       const [rows] = await pool.query("CALL INSERTAR_COMISION(?, ?)", [P_ID_CLIENTE, P_ID_VENTA]);
       res.send('COMISION INSERTADA')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


exports.postComisionesG = async (req, res) => {
    const {P_FECHA_INICIO, P_FECHA_FIN} = req.body
   try {
       const [rows] = await pool.query("CALL MOSTRAR_COMISION_E(?, ?)", [P_FECHA_INICIO, P_FECHA_FIN]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

exports.postDetalleComision = async (req, res) => {
    const {P_ID_CLIENTE,P_FECHA_INICIO, P_FECHA_FIN} = req.body
   try {
       const [rows] = await pool.query("CALL M_DETALLE_COMISION(?, ?, ?)", [P_ID_CLIENTE,P_FECHA_INICIO, P_FECHA_FIN]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

