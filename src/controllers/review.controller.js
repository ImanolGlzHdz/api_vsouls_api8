const { pool } = require('../db.js');

const getReviewClave = async (req, res) => {
    const {CLAVE_P} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_review(?)",[CLAVE_P]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getReviewCant = async (req, res) => {
    const {CLAVE_P} = req.params;
   try {
       const [rows] = await pool.query("SELECT COUNT(*) AS cant FROM review WHERE CLAVE_P = ?",[CLAVE_P]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const postReview = async (req, res) => {
    const { CLAVE_P,ID_USUARIO, DESCRIPCION_R, CALIFICACION_R, FECHA_R} = req.body;
   try {
       const [rows] = await pool.query("call sp_new_review(?,?,?,?,?)",[CLAVE_P, ID_USUARIO, DESCRIPCION_R, CALIFICACION_R, FECHA_R]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getReviewMin = async (req, res) => {
    const {CLAVE_P} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_reviewMin(?)",[CLAVE_P]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getReviewMax = async (req, res) => {
    const {CLAVE_P} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_reviewMax(?)",[CLAVE_P]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getReviewRecientes = async (req, res) => {
    const {CLAVE_P} = req.params;
   try {
       const [rows] = await pool.query("call sp_get_reviewRecientes(?)",[CLAVE_P]);
       res.json(rows[0]);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

module.exports = {
    getReviewClave,
    getReviewCant,
    postReview,
    getReviewMin,
    getReviewMax,
    getReviewRecientes,
};