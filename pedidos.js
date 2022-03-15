const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const mysql=require('mysql2')

var pool= mysql.createPool({
    connectionLimit:20,
    host: 'localhost',
      user: 'root',
      password: 'Xeraton246810',
      database: 'pedidos'
  })
  
  app.set('view engine', 'ejs')
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}))
  
app.get("/",function (pet,res) { 

    pool.getConnection(function(err,connec){

        const query = `SELECT * FROM traslados`
        console.log(query)
        connec.query(query, function(error, filas, campos){
            res.render('index', {traslados: filas})
        })
        connec.release()
    })
 })

 app.get('/ingresar',function(pet,res){
    res.render('agregar')

})



app.get('/act-form',function(pet,res){


    pool.getConnection(function(err,connec){

        const query = `SELECT * FROM traslados WHERE id= ${connec.escape(pet.query.id)}`
        connec.query(query, function(error, filas, campos){
            res.render('actualizar', {traslados: filas[0]})
        })
        connec.release()
    })

})

app.post('/actualizar-juego',function(pet,res){

    pool.getConnection(function(err,connec){

        const query = `UPDATE traslados SET  
            destino=${connec.escape(pet.body.destino)},
            maizgrueso=${connec.escape(pet.body.maizgrueso)},
            impulsor=${connec.escape(pet.body.impulsor)},
            fase1=${connec.escape(pet.body.fase1)},
            fase2=${connec.escape(pet.body.fase2)},
            postura=${connec.escape(pet.body.postura)},
            avcrecimiento=${connec.escape(pet.body.avcrecimiento)},
            avemgprde= ${connec.escape(pet.body.avengorde)},
            popre=${connec.escape(pet.body.popre)},
            poini=${connec.escape(pet.body.poini)},
            poinisp=${connec.escape(pet.body.poinisp)},
            pofina=${connec.escape(pet.body.pofina)},
            pofinasp=${connec.escape(pet.body.pofinasp)},
            pofinb=${connec.escape(pet.body.pofinb)},
            pocrecimiento=${connec.escape(pet.body.pocrecimiento)},
            poengorde=${connec.escape(pet.body.poengorde)},
            enteroa=${connec.escape(pet.body.enteroa)},
            llapre=${connec.escape(pet.body.llapre)},
            llaini=${connec.escape(pet.body.llaini)},
            llacre=${connec.escape(pet.body.llacre)},
            llades=${connec.escape(pet.body.llades)},
            fino=${connec.escape(pet.body.fino)},
            ceges=${connec.escape(pet.body.ceges)},
            celec=${connec.escape(pet.body.celec)},
            celac=${connec.escape(pet.body.celac)},
            cecre=${connec.escape(pet.body.cecre)},
            cedes=${connec.escape(pet.body.cedes)},
            ceeng=${connec.escape(pet.body.ceeng)},
            ceter=${connec.escape(pet.body.ceter)},
            ganado=${connec.escape(pet.body.ganado)},
            soya=${connec.escape(pet.body.soya)},
            prepos=${connec.escape(pet.body.prepos)},
            pofinbblanco=${connec.escape(pet.body.pofinbblanco)},
            pofinablanco=${connec.escape(pet.body.pofinablanco)},
            enterob=${connec.escape(pet.body.enterob)},
            comentario=${connec.escape(pet.body.comentario)} WHERE id=${connec.escape(pet.body.id)}`
        connec.query(query, function(error, filas, campos){
            res.redirect("/")
        })
        connec.release()
    })
})




app.get('/del-form',function(pet,res){


    pool.getConnection(function(err,connec){

        const query = `DELETE FROM traslados WHERE id=${connec.escape(pet.query.id)}`
        connec.query(query, function(error, filas, campos){
            res.redirect('/')
        })
        connec.release()
    })



})




app.post('/ingresar_pedido',function(pet,res){

    pool.getConnection(function(err,connec){

        const query = `INSERT INTO traslados VALUES (NULL,
        ${connec.escape(pet.body.destino)},
        ${connec.escape(pet.body.maizgrueso)},
        ${connec.escape(pet.body.impulsor)},
        ${connec.escape(pet.body.fase1)},
        ${connec.escape(pet.body.fase2)},
        ${connec.escape(pet.body.postura)},
        ${connec.escape(pet.body.avcrecimiento)},
        ${connec.escape(pet.body.avengorde)},
        ${connec.escape(pet.body.popre)},
        ${connec.escape(pet.body.poini)},
        ${connec.escape(pet.body.poinisp)},
        ${connec.escape(pet.body.pofina)},
        ${connec.escape(pet.body.pofinasp)},
        ${connec.escape(pet.body.pofinb)},
        ${connec.escape(pet.body.pocrecimiento)},
        ${connec.escape(pet.body.poengorde)},
        ${connec.escape(pet.body.enteroa)},
        ${connec.escape(pet.body.llapre)},
        ${connec.escape(pet.body.llaini)},
        ${connec.escape(pet.body.llacre)},
        ${connec.escape(pet.body.llades)},
        ${connec.escape(pet.body.fino)},
        ${connec.escape(pet.body.ceges)},
        ${connec.escape(pet.body.celec)},
        ${connec.escape(pet.body.celac)},
        ${connec.escape(pet.body.cecre)},
        ${connec.escape(pet.body.cedes)},
        ${connec.escape(pet.body.ceeng)},
        ${connec.escape(pet.body.ceter)},
        ${connec.escape(pet.body.ganado)},
        ${connec.escape(pet.body.soya)},
        ${connec.escape(pet.body.prepos)},
        ${connec.escape(pet.body.pofinbblanco)},
        ${connec.escape(pet.body.pofinablanco)},
        ${connec.escape(pet.body.enterob)},
        ${connec.escape(pet.body.comentario)})`
        console.log(query)
        connec.query(query, function(error, filas, campos){
            res.redirect("/")
        })
        connec.release()
    })
})



app.listen(8080, function(){
    console.log("Realiza pedidos")
})