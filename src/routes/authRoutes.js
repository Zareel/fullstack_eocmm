import express from "express"
import { signup } from "../controllers/authContoller.js"

const router = express.Router()

// routes
// signup | method:post | /api/v1/auth/signup
router.post("/signup", signup)


export default router