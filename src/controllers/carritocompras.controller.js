const { pool } = require('../db.js');

const getnumerocarrito = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CONTADOR_CARRITO(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getCarritoProd = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PRODUCTOS_PREVENTIVO(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
const getCarritoProdpv = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call PRIMERA_VEZ_VER_PRODUCTOS(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
const getCarritoPaq = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PAQUETES_PREVENTIVO(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const createProductosCarritoCompras = async (req, res) => {
    try {
        const {idusuario, claveproducto} = req.params
        const [rows] = await pool.query('CALL CARRITO_AGREGAR_PRODUCTOS(?,?)',[idusuario, claveproducto])
        // res.send('Nivel insertado')
        res.json(rows);
        console.log('producto agregado 1')
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
 }

const createPaqueteCarritocompras = async (req, res) => {
    // const {idusuario, clavepaquete} = req.params
    // console.log(idusuario, clavepaquete)
    try {
        
        const {idusuario, clavepaquete} = req.params
        const [rows] = await pool.query('CALL CARRITO_AGREGAR_PAQUETES(?,?)',[idusuario, clavepaquete])
        // res.send('Nivel insertado')
        res.json(rows);
        console.log(idusuario, clavepaquete)
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
 }


//  operaciones de totales de compra

const gettotalproductos = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_TOTAL_PRODUCTOS(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const gettotalpaquetes = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_TOTAL_PAQUETES(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const gettotaltotal = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_TOTAL_FINAL(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

// operacion de finalizar venta

const getfinalizarventa = async (req, res) => {
    const {id} =req.params
   try {
       const [rows] = await pool.query("call finalizarventa(?)",[id]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

// operaciones del sumar restar dentro del carrito de compras

const restarproductosalcarritodecompras = async (req, res) => {
    const {idusuario, idproducto} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_RESTAR_PRODUCTOS(?, ?)",[idusuario, idproducto]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const postsumarproductosalcarrito = async (req, res) => {
    const {idusuario, idproducto} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PRODUCTOS_SUMA(?, ?)",[idusuario, idproducto]);
       res.json(rows);
       console.log('ok')
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const posteliminarproductosalcarrito = async (req, res) => {
    const {idusuario, idproducto} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_ELIMINAR_PRODUCTO(?,?)",[idusuario, idproducto]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const posteliminarproductosalcarritopv = async (req, res) => {
    const {idusuario, idproducto} =req.params
   try {
       const [rows] = await pool.query("call PRIMERA_VEZ_ELIMINAR_PRODUCTOS(?,?)",[idusuario, idproducto]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// procedimientos para el crud de los paquetes

const posteliminarpaquetesdelcarrito = async (req, res) => {
    const {idusuario, idpaquete} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PAQUETE_ELIMINAR(?,?)",[idusuario, idpaquete]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
const postsumarpaquetesalcarrito = async (req, res) => {
    const {idusuario, idpaquete} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PAQUETES_SUMAR(?,?)",[idusuario, idpaquete]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
const postrestarpaquetesalcarrito = async (req, res) => {
    const {idusuario, idpaquete} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PAQUETES_RESTAR(?,?)",[idusuario, idpaquete]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const getobtenerpaquetesnombresolo = async (req, res) => {
    const {idusuario} =req.params
   try {
       const [rows] = await pool.query("call CARRITO_PAQUETES_NOMBRE_SOLO(?)",[idusuario]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// finalizar compra
const postfinalizarventa = async (req, res) => {
    const {idusuario, statusven, preciofin} =req.params
   try {
       const [rows] = await pool.query("call FINALIZAR_VENTA_CARRITO(?, ?, ?)",[idusuario, statusven, preciofin]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

const validarventa = async (req, res) => {
    const {idusuario, statusven, preciofin} =req.params
   try {
       const [rows] = await pool.query("call FINALIZAR_VENTA_CARRITO(?, ?, ?)",[idusuario, statusven, preciofin]);
       res.json(rows);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

module.exports = {
    validarventa,
    getnumerocarrito,
    getCarritoProd,
    getCarritoProdpv,
    getCarritoPaq,
    createProductosCarritoCompras,
    createPaqueteCarritocompras,
    gettotalproductos,
    gettotalpaquetes,
    gettotaltotal,
    getfinalizarventa,
    postsumarproductosalcarrito,
    restarproductosalcarritodecompras,
    posteliminarproductosalcarrito,
    posteliminarproductosalcarritopv,
    posteliminarpaquetesdelcarrito,
    postsumarpaquetesalcarrito,
    postrestarpaquetesalcarrito,
    postfinalizarventa,
    getobtenerpaquetesnombresolo,
};