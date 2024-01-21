const { pool } = require('../db.js');
 
 const getNiveles = async (req, res) => {
    try {
        const [rows] = await pool.query("call NIVELES_VER_SOCIO");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 const createNiveles = (req, res) => {
    try {
        const {nombre_nivel, limite, comisionpuntos} = req.body
        pool.query('INSERT INTO niveles (nombre_nivel, limite, comisionpuntos) VALUES (?,?,?)',[nombre_nivel, limite, comisionpuntos])
        // res.send('Nivel insertado')
        console.log('nivel insertado')
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
 }

const getNivelesid = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM niveles WHERE id_nivel = ?", [
          id,
        ]);
    
        if (rows.length <= 0) {
          return res.status(404).json({ message: "nivel no encontrado" });
        }
    
        res.json(rows[0]);
      } catch (error) {
        return res.status(500).json({ message: "error" });
      }
 }

 const getNivelesidsocio = async (req, res) => {
  try {
      const { id } = req.params;
      const [rows] = await pool.query("call NIVEL_OBTENER_NIVEL_SOCIO (?)", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "nivel no encontrado" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "error" });
    }
}

 const updateNiveles =async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_nivel, limite , comisionpuntos} = req.body;
    
        const [result] = await pool.query(
          "UPDATE niveles SET nombre_nivel = IFNULL(?, nombre_nivel), limite = IFNULL(?, limite), comisionpuntos = IFNULL(?, comisionpuntos) WHERE id_nivel = ?",
          [nombre_nivel, limite,comisionpuntos, id]
        );
    
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "nivel no encontrado" });
    
        const [rows] = await pool.query("SELECT * FROM niveles WHERE id_nivel = ?", [
          id,
        ]);
    
        res.json('OK');
      } catch (error) {
        return res.status(500).json({ message: "error" });
      }
 }

 const deleteNiveles = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM niveles WHERE id_nivel = ?", [id]);
    
        if (rows.affectedRows <= 0) {
          return res.status(404).json({ message: "nivel eliminado" });
        }
    
        res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: "error" });
      }
 };

 module.exports = {
  getNiveles,
  createNiveles,
  getNivelesidsocio,
  updateNiveles,
  deleteNiveles,
  getNivelesid,
};