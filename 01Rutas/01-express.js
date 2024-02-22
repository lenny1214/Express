"use strict"

let express = require('express'),
mongoose=require('mongoose'),
bodyParser=require('body-parser'),
app = express();

//Parse
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//.env
require('dotenv').config();
let port = process.env.PORT || 3000;

//Static files
app.use(express.static(__dirname+'/public/'));

//Views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

//Routes
app.use('/', require('./router/rutas'));
app.use('/monos', require('./router/monos'))
mongoose.set('strictQuery', false);
//Conexión a BBDD
const user = process.env.DB_USER || 'lenny';
const password = process.env.DB_PASSWORD || 'dY1k0HYElVn8BhF8';
const dbname = process.env.DB_NAME || 'monos';
const uri=`mongodb+srv://${user}:${password}@lenny.jttodps.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(()=>console.log('Base de datos conectada'))
    .catch(e=> console.log(e))



app.use((req,res)=>{
    res.status(404).render("404", {
        titulo: "Error 404",
        description: "Page not found"
    })
})

.listen(process.env.PORT)

console.log('Iniciando Express en el puerto 3000')