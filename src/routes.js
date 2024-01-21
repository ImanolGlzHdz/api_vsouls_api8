const express = require('express')
const routes = express.Router()
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, './images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 }
])

const fileUploadImg = multer({
    storage: diskstorage
}).single('data')


routes.post('/create/product', fileUpload,(req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')

        const {claveP, nombreP, descP, benfP, precioP, stockP}= req.body;
        const image = fs.readFileSync(path.join(__dirname, './images/' + req.files['image'][0].filename))
        console.log(image);
      
        const img1 = fs.readFileSync(path.join(__dirname, './images/' +  req.files['img1'][0].filename))
        console.log(img1);

        const img2 = fs.readFileSync(path.join(__dirname, './images/' +  req.files['img2'][0].filename))
        console.log(img2);

        const img3 = fs.readFileSync(path.join(__dirname, './images/' +  req.files['img3'][0].filename))
        console.log(img3);

        

        conn.query('INSERT INTO product set ?', [{claveP, nombreP, descP, benfP, precioP, stockP, image,img1,img2, img3,statusP:1}], (err, rows) => {
            if(err) return res.send(err)

            res.send('Producto guardado exitosamente!')
        })
    })  
})

routes.get('/imagesI', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        console.log('IMAGENES');

        conn.query('SELECT * FROM product', (err, rows)=>{
            if(err) return res.send(err)
            if(err) return res.status(500).send('server error')
            rows.map(img =>{
                
                fs.writeFileSync(path.join(__dirname, './dbimages/'+ img.claveP + '-image.png'), img.image)
                fs.writeFileSync(path.join(__dirname, './dbimages/'+ img.claveP + '-img1.png'), img.img1)
                fs.writeFileSync(path.join(__dirname, './dbimages/'+ img.claveP + '-img2.png'), img.img2)
                fs.writeFileSync(path.join(__dirname, './dbimages/'+ img.claveP + '-img3.png'), img.img3)
            })

            const imagedir = fs.readdirSync(path.join(__dirname, './dbimages/'))

            res.json(imagedir)
        })
    })
})

routes.put('/actualizarP/:claveP', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        

        conn.query('UPDATE product set ? WHERE claveP = ?', [req.body,req.params.claveP], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Producto actualizado')
        })
    })
})

routes.put('/actualizarI/:claveP', fileUpload,(req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        const {tipoI} = req.body;
        console.log(tipoI);
        fs.unlinkSync(path.join(__dirname, './dbimages/'+ req.params.claveP + '-'+tipoI+'.png'));

        const imag = fs.readFileSync(path.join(__dirname, './images/' + req.files[tipoI][0].filename))

        conn.query('UPDATE product set '+tipoI +'=? WHERE claveP = ?', [imag, req.params.claveP], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Imagen Principal actualizado')
        })
    })
})


routes.get('/productos', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT claveP, nombreP, descP, benfP, precioP, stockP, statusP FROM product', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.get('/productosActivos', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT claveP, nombreP, descP, benfP, precioP, stockP FROM product where statusP = 1', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/new/review', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('INSERT INTO review set ?', [req.body], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Comentario insertado')
        })
    })
})

routes.get('/review/:claveP', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT idR, descR, calificacionR, fechaR, nombreCliente, apellidoPCiente FROM review INNER JOIN cliente on review.idCliente=cliente.idCliente WHERE review.claveP = ?',[req.params.claveP], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/new/favorito', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('INSERT INTO favoritos set ?', [req.body], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Producto insertado en Favoritos')
        })
    })
})

routes.get('/fav', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT idFavorito, favoritos.claveP, nombreP, precioP from favoritos INNER JOIN product on favoritos.claveP=product.claveP where favoritos.idCliente = 1', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.delete('/favoritos/:claveP', (req, res)=> {
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('DELETE FROM favoritos WHERE claveP=?', [req.params.claveP], (err, rows)=>{
           if(err) return res.send(err)

            res.send('Producto eliminado de Favritos')
        })
    })
})


module.exports = routes