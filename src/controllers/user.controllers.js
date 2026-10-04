import User from "../models/user.models.js"; //trae el modelo user que exportamos con export default. Con el podemos hacer consultas a la tabla Users sin escribit SQL.

export const createUser = async (req, res) => { //export nombrado. Nos permite exportar varias funciones del mismo archivo y se importa con llaves. crea un usuario, async la funcion es asincrona porque habla con la base de datos y eso tarda.
    try{ //probamos el codigo y, si algo falla, saltamos al catch.
        const {name, email, password} = req.body; //req.body es el JSON que mando el cliente. Existe gracias a app.use(express.json()). El const tiene la desestructuracion: es lo mismo que escribir linea por linea.
        if (typeof name !== "string" || name.trim() === "" || name.length > 100) { //typeof name !== "string" no es texto. name.trim() === "" esta vacio o solo tiene espacios, trim() quita los espacios y name.length > 100 supera los 100 caracteres permitidos.
            return res.status(400).json({ //si los datos no son validos, el codigo HTTP 400 Bad Request(el cliente mando algo incorrecto) y .json({message:...}) cuerpo de la respuesta en JSON con un mensaje claro.
                message:"el nombre debe ser texto no vacio de hasta 100 caracteres", //el return corta la funcion. Sin return, despues de responder seguiria ejecutandose el resto y express daria error por responder dos veces.
            });
        }
        if (typeof email !== "string" || email.trim() === "" || email.length > 100) {
    return res.status(400).json({
        message: "el email debe ser texto no vacio de hasta 100 caracteres",
    });
}
if (typeof password !== "string" || password.trim() === "" || password.length > 100) {
    return res.status(400).json({
        message: "la contraseña debe ser texto no vacio de hasta 100 caracteres",
    });
}
        const existingUser = await User.findOne({where: {email}}); //findOne busca un registro, where:{email} es la condicion y await espera el resultado de la base. 
        if (existingUser) {
            return res.status(400).json({message: "el email ya esta registrado"});
        }
        const newUser = await User.create({name, email, password}); //user.create({..}) hace el INSERT y devueñve el registro creado, con su id.
        return res.status(201).json({ //201 created: el codigo correcto cuando se crea un recurso.
            message: "Usuario creado correctamente", //mensaje exitoso.
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message,
        });
    }
};

export const getUsers = async (req, res) => {
        try{
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: "error al obtener los usuario",
                error: error.message,
            });
        }
};