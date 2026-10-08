import express from "express";
import sequelize from "./src/config/database.js"; //traemos nuestra conexion a la base de datos. //es lo que ponemos despues con authenticate y sync
import Task from "./src/models/task.models.js";
import User from "./src/models/user.models.js";
import userRoutes from "./src/routes/user.routes.js"
import taskRoutes from "./src/routes/task.routes.js"

import "dotenv/config";
const app = express(); //guardamos la funcion express dentro de app
const PORT = 3000; //el puerto

app.use(express.json()); //interprete el cuerpo de app de json.

//montar las rutas de usuario
app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => { //define la ruta que responde al metodo "/", req y res son objetos de express al callback. //cuando ingresamos a GET http://localhost:3000/
    res.json({mensaje: "La api esta funcionando"}); //se envia un mensaje en formato json.
});

const IniciarServidor = async () =>{
    try {
        await sequelize.authenticate() //esto prueba la conexion con la base de datos
        console.log("la conexion fue un exito")

        await sequelize.sync(); //si la estrcuctura de mis modelos esta sincronizada con las tablas
        console.log("Tablas sincronizadas"); 

    app.listen(PORT, () => { //levantamos express
        console.log (`el servidor esta escuchando en el puerto http://localhost: ${PORT}`);
    })
    } catch (error) {
        console.log ("no se pudo conectar a la base de datos", error.message);
    }
};

IniciarServidor();