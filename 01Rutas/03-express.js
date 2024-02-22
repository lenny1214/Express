"use strict"


let express = require('express'),
app = express()

app.set("view enigne", "ejs");
app.set("views", __dirname + "/views/");

app.get("/", (req, res) => {
    res.render("index", { titulo: "Mi titulo dinamico" })
})

    .get("/contacto", (req, res) => {
        res.render("contacto", { titulo: "Estamos en contacto de forma dinámica" })
    })

    .use((req, res) => {
        res.status(404).render("404", {
            titulo: "error 404",
            description: "Page not found"
        })
    })

    .listen(3000);

console.log("Iniciando Express en el puerto 3000");