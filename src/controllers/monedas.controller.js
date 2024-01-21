const { pool } = require('../db.js');
 
const getMonedas = async (req, res) => {
   try {
       const [rows] = await pool.query("SELECT * FROM monedas");
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getMonedas_CLIENTE = async (req, res) => {
   try {
       const {id_cliente} = req.params
       const [rows] = await pool.query("CALL OBTENERMONEDAS_CLIENTE(?)",[id_cliente]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const updatemonedascliente = async (req, res) => {
   try {
       const {id_cliente, monedas} = req.params
       const [rows] = await pool.query("CALL ACTUALIZARMONEDASUSADAS(?, ?)",[id_cliente, monedas]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}


const updateMonedas = async(req, res) => {
  try {
    
    const { intercambio } = req.body;
    // Utilizando comillas simples para la consulta SQL (ajustar según el sistema de base de datos)
    pool.query(
      "UPDATE `monedas` SET `IMTERCAMBIOMONEDA` = ? WHERE `ID_MON` = 1",
      [intercambio],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "No se actualizó ningún registro" });
        }

      }
    );
    const [rows] = await pool.query("SELECT * FROM monedas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
  
};



const updatepuntos = async(req, res) => {
  try {
    
    const { intercambio } = req.body;
    // Utilizando comillas simples para la consulta SQL (ajustar según el sistema de base de datos)
    pool.query(
      "UPDATE `monedas` SET `intercambiomoneda` = ? WHERE `idmon` = 2",
      [intercambio],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "No se actualizó ningún registro" });
        }

      }
    );
 

    const [rows] = await pool.query("SELECT * FROM monedas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
  
};

const updateintercambiosocios = async(req, res) => {
  try {
    
    const { intercambio } = req.body;
    // Utilizando comillas simples para la consulta SQL (ajustar según el sistema de base de datos)
      
    pool.query(
      "UPDATE `monedas` SET `IMTERCAMBIOMONEDA` = ? WHERE `ID_MON` = 3",
      [intercambio],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "No se actualizó ningún registro" });
        }

      }
    );
 

    const [rows] = await pool.query("SELECT * FROM monedas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
  
};

module.exports = {
  getMonedas,
  updateMonedas,
  updatepuntos,
  updateintercambiosocios,
  getMonedas_CLIENTE,
  updatemonedascliente,
};