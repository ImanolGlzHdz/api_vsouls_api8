const { pool } = require('../db.js');
 
const getlistaprimeravez = async (req, res) => {
   try {
       const [rows] = await pool.query("call PRIMERA_VEZ_ADMIN_VER_PRODUCTOS()");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getproductosprimeravez = async (req, res) => {
   try {
        const {id} = req.params
       const [rows] = await pool.query("call primera_vez_mostrar_tarjetas(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const  crearprimeravez = async (req, res) => {
   try {
       const {id,precio} = req.params
       const [rows] = await pool.query("call PRIMERA_VEZ_ADMIN_CREAR (?,?)",[id,precio]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const editarprimeravez = async (req, res) => {
   try {
    const {id,precio} = req.params
       const [rows] = await pool.query("call PRIMERA_VEZ_EDITAR_ADMIN (?,?)",[id,precio]);
       res.json(rows);
    //    console.log('ok')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const elminarprimeavez = async (req, res) => {
   try {
    const {id} = req.params
       const [rows] = await pool.query("call PRIMERA_VEZ_ADMIN_ELIMINAR (?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}



const crearnuevoproductoprimeravez = async (req, res) => {
   try {
    const {id, prod} = req.params
       const [rows] = await pool.query("call CARRITO_AGREGAR_PRIMERA_VEZ (?,?)",[id, prod]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
module.exports = {
    getlistaprimeravez,
    getproductosprimeravez,
    crearprimeravez,
    editarprimeravez,
    elminarprimeavez,
    crearnuevoproductoprimeravez,
 };