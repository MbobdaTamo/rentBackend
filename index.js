import mysql from 'mysql-await'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
//-- road ------
import update from './update.js'
import compte from './compte.js'
import cites from './cites.js'
import chambres from './chambres.js'
import contrat from './contrat.js'
import saveImage from './saveImage.js'
import saveLocataire from './saveLocataire.js'
import locataire from './locataire.js'
import charge from './charge.js'
import inscription from './inscription.js'

// connect to mysql db
let con = mysql.createConnection({
    host: "localhost",
    //port:18747,
    user: "root",
    password: "root",
    database: "location"
})
//let result = await con.awaitQuery(`SELECT * FROM Locataire`)
//console.log(result)
//let con = null
//---------- express setting up --------------

const app = express()
app.use(cookieParser());
app.use(session({
    secret: "my fuckinggg secret sentences",
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false, httpOnly:false,sameSite:'None',maxAge: 1000 * 60 * 60 * 24 * 30 }
}));
let allowedDomains = []
let origine = ''
let cors1 = {origin:function(origin,callback){
    console.log('bonjour'+origin)
    origine = origin
    if(allowedDomains.indexOf(origin) == -1) allowedDomains.push(origin)
    return callback(null,true)
},methods:["POST","OPTIONS"],credentials:true}
app.use(cors(cors1))
const port = 3000

// body parser to retrieve informations
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//--
app.use(    
    fileUpload({
        limits: {
            fileSize: 10000000, // Around 10MB
        },
        abortOnLimit: true,
    })
)
app.use(express.static('public'))

app.set('trust proxy', 1)
app.post('/update.php', (req, res) => {
    console.log('mmonkey dit luffy' + req.session.db)
    if(con == null ) {
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: 'location'
        })
        update(req,res,con)
    }
    else update(req,res,con)
})
app.get('/', (req, res) => {
    res.send('bonjour Gonzalo Lira')
})
app.post('/compte.php', (req, res) => {
    compte(req,res,con)
})
app.post('/cites.php', (req, res) => {
    cites(req,res,con)
})
app.post('/chambres.php', (req, res) => {
    chambres(req,res,con)
})
app.post('/contrat.php', (req, res) => {
    contrat(req,res,con)
})
app.post('/saveLocImg.php', (req, res) => {
    saveImage(req,res)
})
app.post('/saveLocataire.php', (req, res) => {
    saveLocataire(req,res,con)
})
app.post('/locataire.php', (req, res) => {
    locataire(req,res,con)
})
app.post('/charge.php', (req, res) => {
    charge(req,res,con)
})
app.post('/inscription.php', (req, res) => {
    if(req.body.type == 'log' || req.body.type == 'add') con = null
    inscription(req,res,mysql,origine)
})
app.post('/news.php', (req, res) => {
    res.send('0') // no news
    //res.send("<span>vueillez mettre à jour </br><a href='whatheverthehell'>mettre à jour</a></span>")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
