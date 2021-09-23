const express = require("express");
const router = express.Router();
const {InsertarUsers, Login, ConsultarUsers, ConsultarProductos, InsertarVentas, ConsultarVentas, InsertarAyuda, ModalCompra, SignUp, TiempoCompra, SeLoguea, CompletarCompra, ConsultarTabla} = require("../lib/connection");

//3 yates xD 

//post para comprobar usuarios correo y contraseña ///
router.post("/login", async(req, res)=>{
    console.log(req.body);
    var datosL =  await Login(req.body.correo, req.body.contrasenia);
    res.json(datosL);
});

router.post("/reg", async(req, res)=>{
  //console.log(req.body);
  var insertado = await InsertarUsers(req.body.correo, req.body.contrasenia);
  //JSON.stringify(datosR)
  res.json(insertado);
});

//Consultar Usuarios
router.get("/", async(req, res)=>{
  var data = await ConsultarUsers();
  res.json(data.rows)
});

//Consultar Productos
router.get("/prod", async(req, res)=>{
  var data = await ConsultarProductos();
  res.json(data.rows)
});

router.get("/ventas", async(req, res)=>{
  var data = await ConsultarVentas();
  res.json(data.rows);
})
///post para insertar ventas podria ir con query = ? o param /:
router.post("/insertar", async(req, res)=>{
  var ventaTemp = await InsertarVentas(req.body.id_prod, req.body.correo, req.body.cantidad, req.body.total);
  res.json(ventaTemp);
});

router.post("/EAyuda", async(req , res)=>{
  res.json(await InsertarAyuda(req.body.num));
});

router.post("/ECompra", async(req , res)=>{
  res.json(await ModalCompra(req.body.total));
});

router.post("/ESignUp", async(req , res)=>{
  res.json(await SignUp(req.body.num));
});

router.post("/ETiempoCompra", async(req , res)=>{
  res.json(await TiempoCompra(req.body.total));
});

router.post("/ENoCompra", async(req , res)=>{
  res.json(await SeLoguea(req.body.correo));
});

router.post("/ECompraCompleta", async(req , res)=>{
  res.json(await CompletarCompra(req.body.total));
});

router.post("/Consultar", async(req, res)=>{
  res.json(await ConsultarTabla(req.body.tabla));
})


module.exports = router;