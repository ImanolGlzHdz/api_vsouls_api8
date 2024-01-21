const { pool } = require('../db.js');
 
const getmensajes = async (req, res) => {
   try {
       const {id} = req.params
       const [rows] = await pool.query("call FORO_MENSAJES_VER(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


const enviarmensaje = (req, res) => {
    try {
        const {id_usuario, mensaje} = req.body
        pool.query('call FORO_AGREGAR_MENSAJE(?,?)',[id_usuario, mensaje])
        res.json("mensaje enviado")
        console.log('mensaje enviado')
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
};
module.exports = {
  getmensajes,
  enviarmensaje,
};

  