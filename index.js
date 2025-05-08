import {config} from "dotenv"
import {initiServer} from "./configs/server.js"
import {adminDefault} from "./src/user/user.controller.js"


config()
initiServer()
adminDefault()