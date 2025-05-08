import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - course
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del post (generado automáticamente por MongoDB).
 *         title:
 *           type: string
 *           description: Título del post.
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Descripción del post.
 *           maxLength: 999
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del post (por defecto, la fecha actual).
 *         course:
 *           type: string
 *           description: Curso asociado al post.
 *           enum:
 *             - TALLER III
 *             - TECNOLOGÍA III
 *             - PRÁCTICA SUPERVISADA
 *         createdBy:
 *           type: string
 *           description: ID del usuario que creó el post.
 *         postPicture:
 *           type: string
 *           description: Nombre del archivo de la imagen asociada al post.
 *         likes:
 *           type: integer
 *           description: Número de likes del post.
 *           minimum: 0
 *         status:
 *           type: boolean
 *           description: Estado del post (activo o inactivo).
 *       example:
 *         id: "609bda56123456789abcdef0"
 *         title: "Mi primer post"
 *         description: "Este es un post de ejemplo."
 *         date: "2025-05-07T12:00:00Z"
 *         course: "TALLER III"
 *         createdBy: "609bda56123456789abcdef1"
 *         postPicture: "imagen.jpg"
 *         likes: 10
 *         status: true
 */

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [999, "cannot exceed 999 characters"]
    },
    date: {
        type: Date,
        default: Date.now
    },      
    course: {
        type: String,
        required: [true, "Course is required"],
        enum: ["TALLER III", "TECNOLOGÍA III", "PRÁCTICA SUPERVISADA"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"]
    },
    postPicture: {
        type: String
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
});

export default model("Post", postSchema);
