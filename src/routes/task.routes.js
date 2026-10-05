import { Router } from "express";
import {createTask, getTasks,getTasksById, deleteTask, updateTask } from "../controllers/task.controllers.js"

const router = Router();
router.post("/", createTask); //router.post responde al metodo http post(crear).
router.get("/", getTasks);
router.get("/:id",getTasksById);
router.delete("/:id", deleteTask); //introduce al metodo delete, id el numero del usuario viene en la URL y deleteuser es la funcion que se ejecuta.
router.put("/:id", updateTask);

export default router;