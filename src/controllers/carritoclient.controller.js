const { pool } = require('../db.js');

exports.obtenerDatosCarrito = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL ObtenerDatosCarrito(?)',[req.params.idUser]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerDisponiblesPorProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT EXISTENCIAS FROM productos WHERE CLAVE_p = ?', [req.params.claveProd]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.borrarProductoCarrito = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM carrito WHERE ID_USUARIO = ? AND CLAVEPRODUCTO = ?;', [req.params.idUsuario,req.params.claveP]);
        res.send('eliminado del carrito');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarCantidadesCarro = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL actualizarCantidadCarro(?, ?, ?)', [req.params.user, req.params.clave, req.params.cant]);
        res.send('Producto Actualizado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.agregarProductosAlCarro = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL InsertarProductoEnCarrito(?, ?, ?)', [req.params.iduser, req.params.clavep, req.params.cantc]);
        res.send('Producto insertado en el carrito');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};