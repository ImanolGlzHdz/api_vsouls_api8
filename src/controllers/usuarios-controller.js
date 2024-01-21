const { pool } = require('../db.js');
 
const getUsuariosid = async (req, res) => {
    const {id} = req.params;
   try {
       const [rows] = await pool.query("call MIS_DATOS_SOCIO_VER(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const postsocionuevo = async (req, res) => {
    try {
        const { correo, contrasenia, idsocio } = req.params;
        const [rows] = await pool.query("CALL Agregar_socio_nuevo(?, ?, ?)", [correo, contrasenia, idsocio]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
 

const getUsuarios = async (req, res) => {
   try {
       const [rows] = await pool.query("call LISTA_COMPLETA_DE_SOCIOS");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getListadeSubsocios = async (req, res) => {
    const {id} = req.params;
   try {
       const [rows] = await pool.query("call USUARIOS_VER_SOCIOS(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

module.exports = {
    getUsuariosid,
    getUsuarios,
    getListadeSubsocios,
    postsocionuevo,
};

