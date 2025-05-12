import { Router } from "express";
import { createComment, commentsByPost } from "./comment.controller.js";
import { createCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

router.post("/create", createCommentValidator, createComment);

router.get("/post/:postId", commentsByPost);

export default router;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para la gestión de comentarios.
 */

/**
 * @swagger
 * /comments/create:
 *   post:
 *     summary: Crear un nuevo comentario.
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del autor del comentario.
 *               surname:
 *                 type: string
 *                 description: Apellido del autor del comentario.
 *               content:
 *                 type: string
 *                 description: Contenido del comentario.
 *               post:
 *                 type: string
 *                 description: ID del post asociado al comentario.
 *             required:
 *               - name
 *               - surname
 *               - content
 *               - post
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error interno al crear el comentario.
 */

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Obtener comentarios de un post específico.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post cuyos comentarios se desean obtener.
 *     responses:
 *       200:
 *         description: Lista de comentarios del post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No hay comentarios para esta publicación.
 *       500:
 *         description: Error interno al recuperar los comentarios.
 */