import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator,} from "../middlewares/validators-auth.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    deleteFileOnError,
    register
)

router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para la autenticación de usuarios.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único.
 *               email:
 *                 type: string
 *                 description: Correo electrónico único del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario (8 dígitos).
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario.
 *             required:
 *               - name
 *               - surname
 *               - username
 *               - email
 *               - password
 *               - phone
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User has been created"
 *                 name:
 *                   type: string
 *                   example: "Juan"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *       500:
 *         description: Error interno al registrar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registration failed"
 *                 error:
 *                   type: string
 *                   example: "Error details here"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con un usuario existente.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT del usuario.
 *                     profilePicture:
 *                       type: string
 *                       description: Imagen de perfil del usuario.
 *       400:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales invalidas"
 *                 error:
 *                   type: string
 *                   example: "No existe el usuario o correo ingresado"
 *       500:
 *         description: Error interno al iniciar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login failed, server error"
 *                 error:
 *                   type: string
 *                   example: "Error details here"
 */