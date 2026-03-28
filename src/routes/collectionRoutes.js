import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollection,
  singleCollection,
  updateCollection,
} from "../controllers/collectionControllers.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// routes
// createCollection | method: post | /api/v1/collection/create-collection
router.post("/create-collection",createCollection);

// get all collection
router.get("/get-all-collection", getAllCollection);

// delete collection
router.delete("/delete-collection/:id", deleteCollection)

// single collection
router.get("/single-collection/:id",isLoggedIn, singleCollection)

// update collection
router.put("/update-collection/:id", updateCollection)


export default router;
