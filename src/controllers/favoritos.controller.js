const { pool } = require('../db.js');

const postFavoritos = async (req, res) => {
    const {ID_USUARIO, CLAVE_P} = req.body;
   try {
       const [rows] = await pool.query("call sp_new_favorito(?, ?)",[CLAVE_P, ID_USUARIO]);
       res.send('Producto agregado a Favoritos');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const postFavoritossocio = async (req, res) => {
    const {ID_USUARIO, CLAVE_P} = req.body;
   try {
       const [rows] = await pool.query("call sp_new_favorito_socio(?, ?)",[CLAVE_P, ID_USUARIO]);
       res.send('Producto agregado a Favoritos');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
const getFavoritosCliente = async (req, res) => {
    const {ID_CLIENTE} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_favoritos(?)",[ID_CLIENTE]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getFavoritosporIdCliente = async (req, res) => {
    const {ID_CLIENTE} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_favoritos_socios(?)",[ID_CLIENTE]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


const deleteFavoritos = async (req, res) => {
    const { CLAVE_P,ID_USUARIO} = req.body;
   try {
       const [rows] = await pool.query("call sp_delete_favoritos(?, ?)",[CLAVE_P, ID_USUARIO]);
       res.send('Producto eliminado de Favoritos');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const deleteFavoritossocios = async (req, res) => {
    const { CLAVE_P,ID_USUARIO} = req.body;
   try {
       const [rows] = await pool.query("call sp_delete_favoritos_socios(?, ?)",[CLAVE_P, ID_USUARIO]);
       res.send('Producto eliminado de Favoritos');
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

module.exports = {
    postFavoritos,
    getFavoritosCliente,
    deleteFavoritos,
    getFavoritosporIdCliente,
    deleteFavoritossocios,
    postFavoritossocio,
};

