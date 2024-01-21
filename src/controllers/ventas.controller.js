const { pool } = require("../db.js");

const getventas = async (req, res) => {
   try {
    const {fechainicio, fechafin} = req.params
       const [rows] = await pool.query("call VENTAS_VER(?,?)",[fechainicio,fechafin]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getmiscompras = async (req, res) => {
   try {
    const {id} = req.params
       const [rows] = await pool.query("call MIS_COMPRAS_ENTREGADAS (?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getmiscompras2 = async (req, res) => {
    try {
     const {id} = req.params
        const [rows] = await pool.query("call MIS_COMPRAS_ENVIADAS (?)",[id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

const getmiscompras3 = async (req, res) => {
    try {
     const {id} = req.params
        const [rows] = await pool.query("call MIS_COMPRAS_PENDIENTES (?)",[id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

module.exports = {
   getventas,
   getmiscompras,
   getmiscompras2,
   getmiscompras3
};
