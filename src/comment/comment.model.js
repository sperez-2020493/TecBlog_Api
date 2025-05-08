import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - content
 *         - post
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del comentario (generado automáticamente por MongoDB).
 *         name:
 *           type: string
 *           description: Nombre del autor del comentario.
 *           maxLength: 50
 *         surname:
 *           type: string
 *           description: Apellido del autor del comentario.
 *           maxLength: 50
 *         content:
 *           type: string
 *           description: Contenido del comentario.
 *           maxLength: 500
 *         post:
 *           type: string
 *           description: ID del post asociado al comentario.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del comentario.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del comentario.
 *       example:
 *         id: "609bda56123456789abcdef2"
 *         name: "Juan"
 *         surname: "Pérez"
 *         content: "Este es un comentario de ejemplo."
 *         post: "609bda56123456789abcdef0"
 *         createdAt: "2025-05-08T12:00:00Z"
 *         updatedAt: "2025-05-08T12:00:00Z"
 */

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [50, "Name cannot exceed 50 characters"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
    maxLength: [50, "Surname cannot exceed 50 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxLength: [500, "Content cannot exceed 500 characters"]
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Associated post is required"]
  }
},
{
  versionKey: false,
  timestamps: true
});

export default model("Comment", commentSchema);   