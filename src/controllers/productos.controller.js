const { pool } = require('../db.js');


const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM producto");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
 
const getproductosconpaquetes = async (req, res) => {
     try {
         const [rows] = await pool.query("call PAQUETES_PRODUCTOS_VER");
         res.json(rows);
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 }

const getProducts = async (req, res) => {
    console.log("Productos")
    try {
        const [rows] = await pool.query("call sp_get_products()");
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getProductsM = async (req, res) => {
    try {
        const [rows] = await pool.query("call sp_get_products()");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getProductsClave = async (req, res) => {
    const {CLAVE_P} = req.params;
    try {
        const [rows] = await pool.query("call sp_get_products_cLave(?)",[CLAVE_P]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getSearchProductos = async (req, res) => {
    console.log('search')
        const {texto} = req.params
    try {
        const [rows] = await pool.query("call sp_buscador_productos(?)",[texto]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getSearchProductosA = async (req, res) => {
    console.log('search')
        const {texto} = req.params
    try {
        const [rows] = await pool.query("call sp_buscador_productosA(?)",[texto]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getProductosActivos = async (req, res) => {
    try {
        const [rows] = await pool.query("call sp_get_products_activos()");
        if (rows[0].length <= 0) {
            return res.status(404).json([]);
          }
      
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getProductosImagenes = async (req, res) => {
    try {
        const [rows] = await pool.query("call sp_get_products_img()");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putProductos = async (req, res) => {
    const {CLAVE_P} = req.params;
    
    try {
        const [rows] = await pool.query("UPDATE producto set ? WHERE CLAVE_P = ?",[req.body, CLAVE_P]);
        res.send('Producto Actualizado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProductos,
    getproductosconpaquetes,
    getProducts,
    getSearchProductos,
    getSearchProductosA,
    getProductosActivos,
    getProductosImagenes,
    putProductos,
    getProductsClave,
    getProductsM
 };