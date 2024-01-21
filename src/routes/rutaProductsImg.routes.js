const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('../db.js');

const router = express.Router();


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-vsouls-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).fields([
    { name: 'IMG_PRINCIPAL', maxCount: 1 },
    { name: 'IMG1', maxCount: 1 },
    { name: 'IMG2', maxCount: 1 },
    { name: 'IMG3', maxCount: 1 }
])

router.post('/create/product', fileUpload,(req, res) => {
    
    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')

        const {CLAVE_P, NOMBRE_P, DESCRIPCION_P, BENEFICIOS_P, PRECIO_P,PRECIO_SOCIO_P , STOCK_P}= req.body;
        const IMG_PRINCIPAL = fs.readFileSync(path.join(__dirname, '../images/' + req.files['IMG_PRINCIPAL'][0].filename))
      
        const IMG1= fs.readFileSync(path.join(__dirname, '../images/' +  req.files['IMG1'][0].filename))

        const IMG2 = fs.readFileSync(path.join(__dirname, '../images/' +  req.files['IMG2'][0].filename))

        const IMG3 = fs.readFileSync(path.join(__dirname, '../images/' +  req.files['IMG3'][0].filename))

        

        conn.query('INSERT INTO producto set ?', [{CLAVE_P, NOMBRE_P, DESCRIPCION_P, BENEFICIOS_P, PRECIO_P,PRECIO_P, STOCK_P, IMG_PRINCIPAL,IMG1,IMG2, IMG3,STATUS_P:1}], (err, rows) => {
            if(err) 
                if (err.code ==  "ER_DUP_ENTRY") {
                    return res.status(404).json({ message: "Ya existe el producto" });
                }

            res.send('Producto guardado exitosamente!')
        })
    })  
})

router.get('/imagesI', (req, res)=> {
    console.log('imagenes');
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows)=>{
            if(err) return res.send(err)
            if(err) return res.status(500).send('server error')
            rows.map(img =>{
                
                fs.writeFileSync(path.join(__dirname, '../dbimages/products/'+ img.CLAVE_P + '-IMG_PRINCIPAL.png'), img.IMG_PRINCIPAL)
                fs.writeFileSync(path.join(__dirname, '../dbimages/products/'+ img.CLAVE_P + '-IMG1.png'), img.IMG1)
                fs.writeFileSync(path.join(__dirname, '../dbimages/products/'+ img.CLAVE_P + '-IMG2.png'), img.IMG2)
                fs.writeFileSync(path.join(__dirname, '../dbimages/products/'+ img.CLAVE_P + '-IMG3.png'), img.IMG3)
            })

            const imagedir = fs.readdirSync(path.join(__dirname, '../dbimages/products/'))

            res.json(imagedir)
        })
    })
})

router.put('/actualizarI/:CLAVE_P', fileUpload,(req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        const {tipoI} = req.body;
        fs.unlinkSync(path.join(__dirname, '../dbimages/products/'+ req.params.CLAVE_P + '-'+tipoI+'.png'));

        const imag = fs.readFileSync(path.join(__dirname, '../images/' + req.files[tipoI][0].filename))

        conn.query('UPDATE producto set '+tipoI +'=? WHERE CLAVE_P = ?', [imag, req.params.CLAVE_P], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Imagen actualizada')
            
        })
    })
})



module.exports = router;
