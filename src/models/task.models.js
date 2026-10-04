import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Task = sequelize.define("task", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true, //crea un modelo de sequelize
},
    title:{
        type: DataTypes.STRING(100),
        allowNull:false, //no debe tener un valor nulo.
        unique: true, //debe ser unico.
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, //es el valor si no se envia el campo.
    },
});

export default Task;