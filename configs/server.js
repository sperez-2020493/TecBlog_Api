"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js"
import authRoutes from "../src/auth/auth.routes.js"
import postRoutes from "../src/post/post.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import userRoutes from "../src/user/user.routes.js"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc";


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "TecBlog API Documentation",
        version: "1.0.0",
        description: "Documentación de la API para BackWarehouse",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3001}`,
            description: "Servidor local",
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/**/*.routes.js"], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}


const routes = (app) =>{
    app.use("/TecBlog/v1/auth", authRoutes)
    app.use("/TecBlog/v1/post", postRoutes)
    app.use("/TecBlog/v1/comment", commentRoutes)
    app.use("/TecBlog/v1/user", userRoutes)
}


const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initiServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
       routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
        console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}