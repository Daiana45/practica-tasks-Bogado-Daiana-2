import Task from "../models/task.models.js"; //importamos el modelo.

export const createTask = async(req, res) => { //estamos creando y exportando una funcion que despues vamos a importar en las rutas.
    try{
        const {title, description, isComplete} = req.body; //tiene los datos que el cliente envio.
           if (typeof title !== "string" || title.trim() === "" || title.length > 100) { //validamos title, hay trs condiciones.
      return res.status(400).json({ //el 400 significa que hubo un problema con los datos enviados por el cliente
        message: "el titulo no debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message: "la descripcion debe ser texto no vacio hasta 100 caracteres",
      });
    }
    if (
      typeof isComplete !== "boolean"
    ) {
      return res.status(400).json({
        message:
          "el estado de la tarea debe ser completo o incompleto",
      });
    }
    const newTask = await Task.create({title, description, isComplete}); //una vez que todas esten validadas, esto significa crear un nuevo registro en la tabla del modelo Task. Los datos que queremos guardar y await porque es una operacion que puede tardar.
    return res.status(200).json({
        message: "la tarea se creo correctamente",
        task: newTask,
    })
    } catch(error) {
        return res.status(500).json({
            message:"hubo un problema al crear la tarea",
            error: error.message, //error es el error completo y error.message el mensaje de error.
        });
    }
};

//obtener todas las tareas
export const getTasks = async (req, res) => { //sirve para tener todas las tareas
  try {
    const task = await Task.findAll(); //findAll busca todos los registros de la tabla.
    return res.status(200).json(task); //muestra las tareas
  } catch (error) {
    return res.status(500).json({
  message: "error al obtener las tareas",
  error: error.message,
});
} 
};


//buscar una tarea por ID
export const getTasksById = async (req, res) => {
    try{
    const {id} = req.params; //obtenemos el id, params contiene los parametros que vienen de la URL
    const task = await Task.findByPk(id); //buscamos por ID, findByPk(): buscar por primary key
    if (!task) { //existe? si ! 
    return res.status(404).json({message: "tarea no encontrada"})
    }
    return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener la tarea",
            error:error.message
        });
    }
};


//eliminar una tarea
export const deleteTask = async (req, res) => {
    try{
        const {id} = req.params; //obtenemos el id
        const task = await Task.findByPk(id); //buscamos la tarea por el id
        if(!task) { //existe?
            return res.status(404).json({message:"tarea no encontrada"});
        }
        await task.destroy(); //destroy significa eliminar ese registro de la base de datos.
        return res.status(200).json({message: "tarea eliminado con exito"});
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};


//modificar una tarea existente
export const updateTask = async (req, res) => {
    try{
        const {id} = req.params; //obtenemos el id
        const {title, description, isComplete} = req.body; //para saber que datos queremos modificar
        const task = await Task.findByPk(id); //buscamos la tarea
        if(!task) { //la tarea no existe?
            return res.status(404).json({message: "tarea no encontrada"});
        }
        //volver a validar porque los nuevos datos tambien deben ser validados
        if (typeof title !== "string" || title.trim() === "" || title.length > 100) {
      return res.status(400).json({
        message: "el titulo no debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message: "la descripcion debe ser texto no vacio hasta 100 caracteres",
      });
    }
    if (
      typeof isComplete !== "boolean"
    ) {
      return res.status(400).json({
        message:
          "el estado de la tarea debe ser completo o incompleto",
      });
    }
    //actualizar
    await task.update({title, description, isComplete });
        return res.status(200).json({
            message:"tarea actualizada",
            task,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error al actualizar la tarea",
            error: error.message,
        });
    }
};