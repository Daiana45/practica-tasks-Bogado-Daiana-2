import express from "express";
import sequelize from "./src/config/database.js"; //traemos nuestra conexion a la base de datos.
import Task from "./src/models/task.models.js";
import User from "./src/models/user.models.js";
import userRoutes from "./src/routes/user.routes.js"
import taskRoutes from "./src/routes/task.routes.js"

import "dotenv/config";
const app = express(); //guardamos la funcion express dentro de app
const PORT = 3000; //el puerto

app.use(express.json()); //transformamos el cuerpo de app de json a formato js.
app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => { //define la ruta que responde al metodo "/", req y res son funciones.
    res.json({mensaje: "La api esta funcionando"}); //se envia un mensaje en formato json.
});

const IniciarServidor = async () =>{
    try {
        await sequelize.authenticate()
        console.log("la conexion fue un exito")

        await sequelize.sync();
        console.log("Tablas sincronizadas");

    app.listen(PORT, () => {
        console.log (`el servidor esta escuchando en el puerto http://localhost: ${PORT}`);
    })
    } catch (error) {
        console.log ("no se pudo conectar a la base de datos", error.message);
    }
};

IniciarServidor();