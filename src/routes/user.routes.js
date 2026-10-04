import { Router } from "express"; //trae router. Va entre llaves porque es un export nombrado (express exporta varias cosas).
import { createUser, getUsers } from "../controllers/user.controllers.js";

const router = Router(); //ejecuta Router() y guarda en router un mini-grupo de rutas independiente. Piensa en el como una seccion de la API (la de usuarios) que despues se enchufa en app.js. Gracias a esto, cada recurso(users, tasks) tiene su propio archivo de rutas y el proyecto queda orientado.
router.post("/", createUser); //router.post responde al metodo http post(crear).
router.post("/", getUsers);

export default router;