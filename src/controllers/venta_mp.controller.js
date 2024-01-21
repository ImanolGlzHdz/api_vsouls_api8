const { pool } = require('../db.js');
 
 const getventaexistosa = async (req, res) => {
    const { idlicente } = req.params
    try {
        const [rows] = await pool.query("call VENTA_EXITOSA_MP(?)", [idlicente]);
        res.json(rows);
        // console.log(idlicente, 'ventamysql')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 const getventafallida = async (req, res) => {
    const { idlicente } = req.params
    try {
        const [rows] = await pool.query("call VENTA_FALLIDA(?)", [idlicente]);
        res.json(rows);
        // console.log(idlicente, 'ventamysql')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 const getventapendiente = async (req, res) => {
    const { idlicente } = req.params
    try {
        const [rows] = await pool.query("call VENTA_PENDIENTE(?)", [idlicente]);
        res.json(rows);
        // console.log(idlicente, 'ventamysql')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 module.exports = {
    getventapendiente,
    getventafallida,
    getventaexistosa,
 }