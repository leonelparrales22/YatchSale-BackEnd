const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");


const app = express();
require("./lib/connection");
//Config
app.set("port", process.env.PORT || 8080);
app.set("public", path.join(__dirname, "public"));


//Middelwares
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//Rutas
app.use(require("./routes"));

//Public
app.use(express.static(app.get("public")));


//Listener
const httpServer = http.createServer(app);

httpServer.listen(app.get("port"), ()=>{
    console.log("Server in port:", app.get("port"));
})