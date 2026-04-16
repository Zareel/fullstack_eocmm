import express from "express"
import { createProduct } from "../controllers/productControllers.js";
import formidable from "express-formidable"

const router = express.Router();

// createProdct  | method: post | path: "/api/v1/product/create-product"
router.post("/create-product",formidable(), createProduct)



export default router