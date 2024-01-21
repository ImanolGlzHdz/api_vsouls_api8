const { pool } = require('../db.js');
 

const getPaquetesActivosconproductos = async (req, res) => {
        try {
            const [rows] = await pool.query("call PAQUETES_VER_LISTA");
            res.json(rows);
           } catch (error) {
               res.status(500).json({ error: error.message });
           }
}



const getPaquetesTodos = async (req, res) => {
   try {
    const [rows] = await pool.query("call PAQUETES_VER");
    res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getPaqueteProductoporid = async (req, res) => {
    try {
        const {id} = req.params
       const [rows] = await pool.query("call PAQUETES_LISTA_PRODUCTOS_AGREGADOS(?);",[id]);
       res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

const getPaquetesActivos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM niveles");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

const updatepaquetes = async (req, res) => {
    // res.json(req.body)
    try {
        const {id, statuspaquete} = req.params
        const [rows] = await pool.query('CALL PAQUETE_STATUS_ACTUALIZAR(?, ?);',[id, statuspaquete])
        // res.send('Nivel insertado')
        console.log('status actualizado')
        // try {
        //     const [rows] = await pool.query("call selectpaquetes");
            res.json(rows);
        // } catch (error) {
            // res.status(500).json({ error: error.message });
        // }
      } catch (error) {
        return res.status(500).json({ message: "Algun error ocurrio" });
      }
 }

//  export const deletepaquetes = async (req, res) => {
//     // res.json(req.body)
//     try {
//         const {id} = req.params
//         pool.query('CALL eliminarpaquete(?);',[id])
//         // res.send('Nivel insertado')
//         console.log('paquete eliminado')
//         try {
//             res.json('paquete eliminado')
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//       } catch (error) {
//         return res.status(500).json({ message: "Algun error ocurrio" });
//       }
//  }

 const createPaquetes = async (req, res) => {
    try {
        const { id_paquete, nombre_paquete, productos, precio } = req.body;

        if (productos && Array.isArray(productos)) {
            for (const producto of productos) {
                const { id_producto, cantidad } = producto;
                await pool.query('CALL PAQUETE_CREAR(?, ?, ?, ?, ?)', [id_paquete, nombre_paquete, id_producto, precio, cantidad]);
            }
            // console.log("CALL listapaquetesproductos(?)", [id_paquete])
            const [rows] = await pool.query("CALL PAQUETES_LISTA_PRODUCTOS_AGREGADOS(?)", [id_paquete]);

            if (rows && rows.length > 0) {
                res.json(rows);
                console.log('Paquete: ' + id_paquete);
            } else {
                console.error('Error al ejecutar el procedimiento almacenado. No se obtuvieron filas.');
                return res.status(500).json({ message: 'Error al ejecutar el procedimiento almacenado' });
            }
        } else {
            console.log('La solicitud no incluye una lista de productos. Se continuará con id_paquete:', id_paquete);
            return res.status(400).json({ message: 'La solicitud debe incluir una lista de productos.' });
        }
    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).json({ message: 'Something goes wrong' });
    }
};




const deletePaquetes = async (req, res) => {
    try {
        const { id } = req.params;

        // Llamada al procedimiento almacenado
        const [rows] = await pool.query("CALL PAQUETE_ELIMINAR_PAQUETE(?)", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "producto no encontrado" });
        }

        // Obtener los resultados de la consulta a la tabla de paquetes
        const [paquetesRows] = await pool.query("SELECT * FROM paquetes");

        res.json({ deletedRows: rows, paquetes: paquetesRows });
    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


const deleteproductosdepaquete = async (req, res) => {
    try {
        const { idprod, idpaque } = req.params;

        // Llamada al procedimiento almacenado
        const [rows] = await pool.query("CALL PAQUETE_ELIMINAR_PRODUCTO(?, ?)", [idpaque, idprod]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "producto no encontrado" });
        }

        res.json('ok');
    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


const deleteProductoPaquete = async (req, res) => {
    try {
        const { id, idprod } = req.params;

        // Llamada al procedimiento almacenado
        const [result] = await pool.query("CALL restarproducto(?,?)", [idprod, id]);

        // Verificar el resultado del procedimiento almacenado
        const affectedRows = result[0].affectedRows;

        if (affectedRows <= 0) {
            return res.status(404).json({ message: "paquete no encontrado" });
        }

        res.json(result);
    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


const updateProductoPaquete = async (req, res) => {
    try {
        const { id, idprod } = req.params;

        // Llamada al procedimiento almacenado
        const [result] = await pool.query("CALL sumarproductos(?,?)", [idprod, id]);

        // Verificar el resultado del procedimiento almacenado
        const affectedRows = result[0].affectedRows;

        if (affectedRows <= 0) {
            return res.status(404).json({ message: "paquete no encontrado" });
        }

        res.json(result);
    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = {
    getPaquetesActivosconproductos,
    getPaquetesTodos,
    getPaqueteProductoporid,
    getPaquetesActivos,
    updatepaquetes,
    createPaquetes,
    deletePaquetes,
    deleteproductosdepaquete,
    deleteProductoPaquete,
    updateProductoPaquete,
};

