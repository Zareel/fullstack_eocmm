import express from "express";
import { createProduct, deleteProduct, getAllProducts, productPhoto, singleProduct, updateProduct } from "../controllers/productControllers.js";
import formidable from "express-formidable";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// createProdct  | method: post | path: "/api/v1/product/create-product"
router.post(
  "/create-product",
  isLoggedIn,
  isAdmin,
  formidable(),
  createProduct,
);

// getAllProducts | method: get | path: "/api/v1/product/get-all-products"
router.get("/get-all-products", getAllProducts)

// singleProduct | method: get | path: "/api/v1/product/single-product/:slug"
router.get("/single-product/:slug", singleProduct)

// productPhoto | method: get | path: "/api/v1/product/product-photo/:pid"
router.get("/product-photo/:pid", productPhoto)

// deleteProduct | method:delete | path: "/api/v1/product/delete-product/:pid"
router.delete("/delete-product/:pid",isLoggedIn, isAdmin, deleteProduct)

// updateProduct | method: put | path: "/api/v1/product/updeate-product/:pid"
router.put("/update-product/:pid",formidable(), updateProduct)

export default router;
