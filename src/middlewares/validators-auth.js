import { body } from "express-validator";
import { emailExist, usernameExist} from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";


export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("User is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is envalide"),
    body("password").not().isEmpty().withMessage("Password is envalide"),
    body("email").custom(emailExist),
    body("username").custom(usernameExist),
   body("password").isStrongPassword({
        minLength: 4,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
        }),
        validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]