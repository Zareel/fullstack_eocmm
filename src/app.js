import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import crypto from "crypto"
import authRoutes from "./routes/authRoutes.js"

const app = express()

// middlewares
app.use(cors()) //allows to interact with client which is loaded in different domain
app.use(express.json()) // instructing the app to accept data in json format
app.use(express.urlencoded({extended:true})) // instructint the app to accept the data in the url encoded format as well
app.use(morgan("dev")) // logs requests, errors and more to the console
app.use(cookieParser()) //it allow the server to access cookie

// routes
app.use("/api/v1/auth", authRoutes)

// crypto key
/*
let key = crypto.randomBytes(64).toString("hex")
console.log(key)
*/


app.get("/", (req, res)=>{
    res.send("<h1>Hello World!</h1")
})


export default app

