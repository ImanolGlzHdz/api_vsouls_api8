const { pool } = require('../db.js');

exports.ventaExitosa = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL ventaExitosa (?)", [req.params.idUser]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.insertarVentaCliente = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL InsertarVentaClientes (?, ?, ?)",[req.params.idUsuario, req.params.totalVenta, req.params.ID_CLIENTE]);
        res.send('venta agregada ');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.insertarVentaClienteSnC = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL InsertarVentaClientesSnC (?, ?)",[req.params.idUsuario, req.params.totalVenta]);
        res.send('venta agregada ');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.limpiarCarrito = async (req, res) => {
    try {
        const [rows] = await pool.query("DELETE FROM carrito WHERE ID_USUARIO = ?",[req.params.idUsuario]);
        res.send('carrito vaciado ');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};