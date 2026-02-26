import express from "express"
import { login, logout, signup } from "../controllers/authContoller.js"

const router = express.Router()

// routes
// signup | method:post | /api/v1/auth/signup
router.post("/signup", signup)

// login | method:post | /api/v1/auth/login
router.post("/login", login)

// logout | method:post | /api/v1/logout
router.post("/logout", logout)


export default router