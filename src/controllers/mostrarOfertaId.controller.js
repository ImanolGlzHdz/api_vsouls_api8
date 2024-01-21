const { pool } = require("../db.js");

exports.getOfertaId = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("CALL MOSTRAR_OFERTA_ID(?)", [id]);
            const formattedData = rows[0].map(item => ({
                ...item,
                FECHA_INICIO: formatDate(item.FECHA_INICIO),
                FECHA_FIN: formatDate(item.FECHA_FIN)
            }));

            res.json(formattedData);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

