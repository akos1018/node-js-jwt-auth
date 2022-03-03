const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const express = require('express')
const app = express()
const port = 3000
const fileupload = require("express-fileupload");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  var cors = require('cors')
  app.use(cors())
  app.use(express.json())
  app.use('/kepek', express.static('kepek'))


  app.get('/sorozat', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id ORDER BY sorozat.sorozat_id', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.get('/sorozatnezettseg', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id ORDER BY sorozat.sorozat_kattintas DESC', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.get('/filmnezettseg', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from filmek ORDER BY filmek.film_kattintas DESC', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  //-----------------------------------------------FILMEK LEKÉRDEZÉSE
  app.get('/film', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id ORDER BY filmek.film_id', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

//-----------------------------------------------SOROZAT MŰFAJOK LEKÉRDEZÉSE
  app.get('/mufaj', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from mufaj  ', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })
//-----------------------------------------------FILMMUFAJ LEKÉRDEZÉSE
  app.get('/filmmufaj', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from film_mufajok ', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

//-----------------------------------------------SOROZAT KOMMENTEK LEKÉRDEZÉSE
  app.post('/kommentek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from komment WHERE komment.komment_sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.post('/sorozatsajatadatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('UPDATE sorozat SET sorozat_kattintas = sorozat_kattintas+1 WHERE sorozat.sorozat_id ='+req.body.bevitel3)
connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.post('/filmsajatadatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()
connection.query('UPDATE filmek SET film_kattintas = film_kattintas+1 WHERE filmek.film_id ='+req.body.bevitel3)
connection.query('SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id WHERE filmek.film_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })


//-----------------------------------------------FILM KOMMENTEK LEKÉRDEZÉSE
  app.post('/filmkommentek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from film_komment WHERE film_komment.film_komment_film_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })
//-----------------------------------------------AJÁNLÁS LEKÉRDEZÉSE
  app.post('/ajanlas', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO ajanlas VALUES (NULL, '"+req.body.bevitel1+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })

//-----------------------------------------------SOROZAT KOMMENT FELVITEL 
  app.post('/kommentfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()



connection.query( "INSERT INTO komment VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+req.body.bevitel3+"');",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })

//-----------------------------------------------FILM KOMMENTEK FELVITELE 
  app.post('/filmkommentfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()



connection.query( "INSERT INTO film_komment VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+req.body.bevitel3+"');",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })

//-----------------------------------------------KERESÉS SOROZATOK KÖZÖTT 
  app.post('/kereses', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_cim like "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })

//-----------------------------------------------KERESÉS FILMEK KÖZÖTT
  app.post('/filmkereses', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id WHERE filmek.film_cim like "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })
  

//-----------------------------------------------SOROZATOK MŰFAJ SZŰRÉSE
  app.post('/sorozatszures', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_mufaj ='+ req.body.bevitel2, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })


  //-----------------------------------------------FILMEK MŰFAJ SZERINTI SZŰRÉSE 
  app.post('/filmszures', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id WHERE filmek.film_mufaj ='+ req.body.bevitel2, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  
  
//-----------------------------------------------SOROZAT KÉPEK LEKÉRDEZÉSE
  app.post('/sorozatkep', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT sorozat.sorozat_kep from sorozat WHERE sorozat.sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  

//-----------------------------------------------FILM KÉPEK LEKÉRDEZÉSE
  app.post('/filmkep', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT filmek.film_kep from filmek WHERE filmek.film_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  //-----------------------------------------------SOROZATOK ÉRTÉKELÉSE
  app.post('/ertekeles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO ertekeles VALUES (NULL, '"+req.body.bevitel1+"','"+req.body.bevitel2+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("siker")
    console.log("Siker")
})

connection.end()

  })
  app.post('/sorozatlink', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'SELECT sorozat.sorozat_link FROM sorozat WHERE sorozat.sorozat_id = '+req.body.bevitel1 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })

  app.post('/filmlink', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'SELECT filmek.film_link FROM filmek WHERE filmek.film_id = '+req.body.bevitel1 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })


  //-----------------------------------------------FILMEK ÉRTÉKELÉSE
  app.post('/filmertekeles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO film_ertekeles VALUES (NULL, '"+req.body.bevitel1+"','"+req.body.bevitel2+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("siker")
    console.log("Siker")
})

connection.end()

  })


  //-----------------------------------------------SOROZATOK ÁTLAGÉRTÉKE
  app.post('/atlagertek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT  ROUND(AVG(ertekeles.ertekeles_ertek),2) AS atlag FROM ertekeles WHERE ertekeles.ertekeles_sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })


  //-----------------------------------------------FILMEK ÁTLAGÉRTÉKE
  app.post('/filmatlagertek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT ROUND(AVG(film_ertekeles.film_ertekeles_ertek),2) AS atlag FROM film_ertekeles WHERE film_ertekeles.film_ertekeles_film_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  //-----------------------------------------------TOP 5 FILM
  app.get('/legjobbfilmek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * ,AVG(film_ertekeles.film_ertekeles_ertek) AS atlag FROM film_ertekeles INNER JOIN filmek ON filmek.film_id=film_ertekeles.film_ertekeles_film_id WHERE film_ertekeles.film_ertekeles_film_id GROUP BY filmek.film_cim ORDER BY (atlag)  DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.get('/legfrissebbfilmek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM filmek ORDER BY filmek.film_ev DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.get('/legfrissebbsorozatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM sorozat ORDER BY sorozat.sorozat_ev DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })


  app.get('/legnezettebbfilmek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM filmek ORDER BY filmek.film_kattintas DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.get('/legnezettebbsorozatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM sorozat ORDER BY sorozat.sorozat_kattintas DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })



  //-----------------------------------------------TOP 5 SOROZAT
  app.get('/legjobbsorozatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT * ,AVG(ertekeles.ertekeles_ertek) AS atlag FROM ertekeles INNER JOIN sorozat ON sorozat.sorozat_id=ertekeles.ertekeles_sorozat_id WHERE ertekeles.ertekeles_sorozat_id GROUP BY sorozat.sorozat_cim ORDER BY (atlag)  DESC LIMIT 5';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })



  app.post('/sorozattorles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('DELETE from sorozat WHERE sorozat_id='+req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log("Siker")
    
    res.send("Siker")
  })
  
  connection.end()
  })

  app.post('/filmtorles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('DELETE from filmek WHERE film_id='+req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log("Siker")
    
    res.send("Siker")
  })
  
  connection.end()
  })


  app.post('/osszessorozatkomment', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from komment  WHERE komment.komment_szoveg like "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/osszesfilmkomment', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from film_komment  WHERE film_komment.film_komment_szoveg like "%'+req.body.bevitel2+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })

  app.use(fileupload());
  app.post("/upload", (req, res) => {
    const newpath = "./kepek/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res.status(500).send({ message: "File upload failed", code: 200 });
      }
        return res.status(200).send({ message: "File Uploaded", code: 200 });
    });
  });

  app.post('/sorozatfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  
  
  connection.query( "INSERT INTO sorozat VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+req.body.bevitel3+"', '"+req.body.bevitel4+"', '"+req.body.bevitel5+"', '"+req.body.bevitel6+"', '"+req.body.bevitel7+"', '"+req.body.bevitel8+"','"+req.body.bevitel15+"',0,0,0);",function (err, rows, fields) {
    if (err) throw err
  
    res.send("Sikerült")
    console.log("Sikerült")
  })
  
  connection.end()
  
  })
  app.post('/filmfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  
  
  connection.query( "INSERT INTO filmek VALUES (NULL, '"+req.body.bevitel9+"', '"+req.body.bevitel10+"', '"+req.body.bevitel11+"', '"+req.body.bevitel12+"', '"+req.body.bevitel13+"', '"+req.body.bevitel14+"','"+req.body.bevitel17+"',0,0,0);",function (err, rows, fields) {
    if (err) throw err
  
    res.send("Sikerült")
    console.log("Sikerült")
  })
  
  connection.end()
  
  })


  app.post('/filmkommenttorles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('DELETE FROM film_komment where film_komment_id='+ req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/sorozatkommenttorles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('DELETE FROM komment where komment_id='+ req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmlike', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT film_like FROM filmek WHERE filmek.film_id='+ req.body.bevitel4, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmdislike', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT film_dislike FROM filmek WHERE filmek.film_id='+ req.body.bevitel4, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmlikefelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'UPDATE filmek SET film_like = film_like+1 WHERE filmek.film_id='+req.body.bevitel4 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })
  app.post('/filmdislikefelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'UPDATE filmek SET film_dislike = film_dislike+1 WHERE filmek.film_id='+req.body.bevitel5 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })

  app.post('/sorozatlike', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT sorozat_like FROM sorozat WHERE sorozat.sorozat_id='+ req.body.bevitel4, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/sorozatdislike', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT sorozat_dislike FROM sorozat WHERE sorozat.sorozat_id='+ req.body.bevitel4, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/sorozatlikefelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'UPDATE sorozat SET sorozat_like = sorozat_like+1 WHERE sorozat.sorozat_id='+req.body.bevitel4 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })
  app.post('/sorozatdislikefelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( 'UPDATE sorozat SET sorozat_dislike = sorozat_dislike+1 WHERE sorozat.sorozat_id='+req.body.bevitel5 ,function (err, rows, fields) {
    if (err) throw err

    res.send(rows)
    console.log(rows)
})

connection.end()

  })
  

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


  
};
