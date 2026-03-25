import express from "express";
import { createCollection } from "../controllers/collectionControllers.js";

const router = express.Router();

// routes
// createCollection | method: post
router.post("/create-collection", createCollection);

export default router;
