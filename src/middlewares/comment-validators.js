import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js"
import { deleteFileOnError } from "./delete-file-on-error.js"

export const createCommentValidator = [
    body("name").notEmpty().withMessage("title is required"),
    body("surname").notEmpty().withMessage("description is required"),
    body("content").notEmpty().withMessage("course is required"),
        validarCampos,
        deleteFileOnError,
        handleErrors
]


