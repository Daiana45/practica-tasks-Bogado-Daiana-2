import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks_users_db", "root", "",{ //en una constante llamada sequelize guarda los datos de nuestra conexion a la base de datos.
    host: "localhost",
    dialect: "mysql"
});

export default sequelize; //exportamos por default, no vamos a usar llaves.