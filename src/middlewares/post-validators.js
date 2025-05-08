import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-role.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { validateJWT } from "./validate-jwt.js";

export const createPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("course").notEmpty().withMessage("course is required"),
        validarCampos,
        deleteFileOnError,
        handleErrors
]

export const updatePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("course").notEmpty().withMessage("course is required"),
        validarCampos,
        handleErrors
]

export const deleteValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]