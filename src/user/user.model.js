import { Schema, model} from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - username
 *         - email
 *         - password
 *         - phone
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario (generado automáticamente por MongoDB).
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *           maxLength: 25
 *         surname:
 *           type: string
 *           description: Apellido del usuario.
 *           maxLength: 25
 *         username:
 *           type: string
 *           description: Nombre de usuario único.
 *         email:
 *           type: string
 *           description: Correo electrónico único del usuario.
 *         password:
 *           type: string
 *           description: Contraseña encriptada del usuario.
 *         profilePicture:
 *           type: string
 *           description: Nombre del archivo de la imagen de perfil del usuario.
 *         phone:
 *           type: string
 *           description: Número de teléfono del usuario (8 dígitos).
 *         role:
 *           type: string
 *           description: Rol del usuario (ADMIN_ROLE o USER_ROLE).
 *           enum:
 *             - ADMIN_ROLE
 *             - USER_ROLE
 *         status:
 *           type: boolean
 *           description: Estado del usuario (activo o inactivo).
 *         likesTotal:
 *           type: integer
 *           description: Total de likes recibidos por el usuario.
 *           minimum: 0
 *         postsTotal:
 *           type: integer
 *           description: Total de publicaciones creadas por el usuario.
 *           minimum: 0
 *       example:
 *         id: "609bda56123456789abcdef3"
 *         name: "Juan"
 *         surname: "Pérez"
 *         username: "juanperez"
 *         email: "juan.perez@example.com"
 *         phone: "12345678"
 *         role: "USER_ROLE"
 *         status: true
 *         likesTotal: 10
 *         postsTotal: 5
 */

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default:'USER_ROLE'

    },
    status:{
        type: Boolean,
        default: true
    },
    likesTotal: {
        type: Number,
        default: 0,
        min: 0
    },
    postsTotal: {
        type: Number,
        default: 0,
        min: 0
    },
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)