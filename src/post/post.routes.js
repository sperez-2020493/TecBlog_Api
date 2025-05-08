import { Router } from "express"
import { createPost, updatePost, deletePost, listPostByComments, likePost } from "./post.controller.js"
import { updatePostValidator, createPostValidator, deleteValidator } from "../middlewares/post-validators.js"
import { uploadPostPicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"


const router = Router()

router.post("/create", uploadPostPicture.single("postPicture"), createPostValidator, deleteFileOnError, createPost)

router.put("/edit/:id", uploadPostPicture.single("postPicture"), updatePostValidator, deleteFileOnError, updatePost)

router.delete("/delete/:id", deleteValidator, deletePost)

router.get("/list", listPostByComments)

router.post("/like/:id", likePost)

export default router

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para la gestión de publicaciones.
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Crear un nuevo post.
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del post.
 *               description:
 *                 type: string
 *                 description: Descripción del post.
 *               course:
 *                 type: string
 *                 description: Curso asociado al post.
 *                 enum:
 *                   - TALLER III
 *                   - TECNOLOGÍA III
 *                   - PRÁCTICA SUPERVISADA
 *               postPicture:
 *                 type: string
 *                 format: binary
 *                 description: Imagen asociada al post.
 *     responses:
 *       201:
 *         description: Post creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token no proporcionado o inválido.
 *       500:
 *         description: Error interno al crear el post.
 */

/**
 * @swagger
 * /posts/edit/{id}:
 *   put:
 *     summary: Editar un post existente.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del post.
 *               description:
 *                 type: string
 *                 description: Nueva descripción del post.
 *               course:
 *                 type: string
 *                 description: Nuevo curso asociado al post.
 *                 enum:
 *                   - TALLER III
 *                   - TECNOLOGÍA III
 *                   - PRÁCTICA SUPERVISADA
 *               postPicture:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen asociada al post.
 *     responses:
 *       200:
 *         description: Post actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado o inactivo.
 *       500:
 *         description: Error interno al actualizar el post.
 */

/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     summary: Desactivar un post.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a desactivar.
 *     responses:
 *       200:
 *         description: Post desactivado correctamente.
 *       404:
 *         description: Post no encontrado.
 *       500:
 *         description: Error interno al desactivar el post.
 */

/**
 * @swagger
 * /posts/list:
 *   get:
 *     summary: Listar posts con sus comentarios.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts con comentarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error interno al obtener los posts.
 */

/**
 * @swagger
 * /posts/like/{id}:
 *   post:
 *     summary: Dar like a un post.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post al que se le dará like.
 *     responses:
 *       200:
 *         description: Like registrado exitosamente.
 *       404:
 *         description: Post no encontrado o inactivo.
 *       500:
 *         description: Error interno al dar like.
 */