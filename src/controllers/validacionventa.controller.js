const { pool } = require('../db.js');

exports.obtenerVentasSinValidar = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL ObtenerVentasSinValidar');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.actualizarVenta = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL ValidarVenta (?)", [req.params.id]);
        res.send('Producto Actualizado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// socios

exports.validarventasocios = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL validarventaencarritocompras");
        res.send('Producto Actualizado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.actualizarVentasocios = async (req, res) => {
    try {
        const {idcliente, idventa} =req.params
        const [rows] = await pool.query("CALL VALIDAR_VENTA_ADMIN_SOCIOS(?,?)",[idcliente,idventa]);
        res.send('Producto Actualizado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.obtenerVentasSinValidarsocios = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL ventassinvalidar_socios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};