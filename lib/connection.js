const {Pool} = require("pg");
const keys = require("../db");

const pool = new Pool(keys);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  });
 
/*pool.on("connect",()=>{
    console.log(keys.database,"Connected");
});*/

var InsertarUsers = async (email, passw)=>{
  var error = [];
  var verif = await pool.query("select correo from USUARIO where correo =$1", [email]);
  if (verif.rows.length > 0) {
    error.push(false);
    error.push("Correo: "+verif.rows[0].correo+" ya esta siendo utilizado");
  }else{
    await pool.query("insert into USUARIO (correo, contrasenia) values ($1, $2)",[email, passw]);
    error.push(true);
    error.push("Registro Exitoso");
  }
  return error;
};

var Login = async(email, passw)=>{
  var datos = [];
  var correo = await pool.query("select * from USUARIO where correo = $1", [email]);
  ///console.log(correo);//correo.rows obtengo las columnas 
  if(correo.rows.length == 0){
    datos.push(false);
    datos.push("Correo no existe!");
    return datos;
  }else{
    var passw = await pool.query("select * from USUARIO where contrasenia = $1",[passw]);
    if (passw.rows.length > 0){
      datos.push(true);
      datos.push("Bienvenido "+correo.rows[0].correo);
      return datos;
    }else{
      datos.push(false);
      datos.push("Contraseña incorrecta");
      return datos;
    }
  }
};

var ConsultarUsers = async()=>{
  return await pool.query("select * from USUARIO");
};

var ConsultarProductos = async()=>{
  return await pool.query("select * from PRODUCTOS ");
};

var InsertarVentas = async(id_prod, correo, cantidad, total)=>{
  var fecha = new Date();
  console.log(fecha);
  var error;
  var data = await pool.query("insert into VENTAS (id_producto, correo, fecha, cantidad, total) values ($1, $2, $3, $4, $5)", [id_prod, correo, fecha, cantidad, total]);
  if (data.rowCount > 0){
      error = true;
  }else{
      error = false;
  }
  return error;
  
};

var ConsultarVentas = async()=>{
  return await pool.query("select * from VENTAS");
};

var InsertarAyuda = async(num)=>{
  var error;
  var fecha = new Date();
  var result = await pool.query("insert into ENTENDIBILIDAD_AYUDA_EN_LINEA (fecha, numero_de_veces) values ($1, $2)",[fecha, num]);
  console.log(result);
  if (result.rowCount > 0){
        error = true;
    }else{
        error = false;
    }
    return error;
}

var ModalCompra = async(total)=>{
  var error;
  var fecha = new Date();
  var result = await pool.query("insert into ENTENDIBILIDAD_ENTRA_MODAL_COMPRA_Y_NO_COMPRA (fecha, total_segundos) values ($1, $2)",[fecha, total]);
  if (result.rowCount > 0){
    error = true;
  }else{
      error = false;
  }
  return error; 
}

var SignUp = async(num)=>{
  var error;
  var fecha = new Date();
  var result = await pool.query("insert into ENTENDIBILIDAD_SING_UP (fecha, numero_de_errores) values ($1, $2)",[fecha, num]);
  if (result.rowCount > 0){
    error = true;
  }else{
      error = false;
  }
  return error;
}

var TiempoCompra = async(total)=>{
  var error;
  var fecha = new Date();
  var result = await pool.query("insert into ENTENDIBILIDAD_TIEMPO_COMPRAR (fecha, total_segundos) values ($1, $2)",[fecha, total]);
  if (result.rowCount > 0){
    error = true;
  }else{
      error = false;
  }
  return error;
}

var SeLoguea = async(correo)=>{
  var error;
  var fecha = new Date();
  try {
    var result = await pool.query("insert into EFECTIVIDAD_SE_LOGUEA_PERO_NO_COMPRA (fecha, correo) values ($1, $2)",[fecha, correo]);
    if (result.rowCount > 0){
      error = true;
    }
  } catch (e) {
    error = false;
  }
  return error;
}

var CompletarCompra = async(total)=>{
  var error;
  var fecha = new Date();
  var result = await pool.query("insert into EFICIENCIA_TIEMPO_PARA_COMPLETAR_COMPRA (fecha, total_segundos) values ($1, $2)",[fecha, total]);
  if (result.rowCount > 0){
    error = true;
  }else{
      error = false;
  }
  return error;
}

var ConsultarTabla = async(TablaName)=>{
  var result = await pool.query("select * from "+ TablaName);
  return result.rows;
} 

  module.exports = {
      InsertarUsers,
      Login,
      ConsultarUsers,
      ConsultarProductos,
      InsertarVentas,
      ConsultarVentas,
      InsertarAyuda,
      ModalCompra,
      SignUp,
      TiempoCompra,
      SeLoguea,
      CompletarCompra,
      ConsultarTabla
  };

  