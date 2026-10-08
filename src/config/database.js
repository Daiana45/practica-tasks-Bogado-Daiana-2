import { Sequelize } from "sequelize"; //en pocas palabras quiere decir quiero traer de la libreria sequelize algo llamado sequelize
//import sirve para traer algo desde otro archivo o libreria, {sequelize} esta trayendo especificamente la clase/funcion sequelize. sequelize es la libreria que instalamos con npm


//configuracion a la base de datos.
const sequelize = new Sequelize("tasks_users_db", "root", "",{ //en una constante llamada sequelize guarda los datos de nuestra conexion a la base de datos. new Sequelize(): significa que vamos a crear una nueva instancia de Sequelize, estamos configurando una conexion con la base de datos.
   //el objeto de configuracion
    host: "localhost", //donde esta ubicada la base de datos
    dialect: "mysql" 
});


export default sequelize; //exportamos por default, no vamos a usar llaves.