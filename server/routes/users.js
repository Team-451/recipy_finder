import express from "express";
import { getRecipe, updateSavedRecipe } from "../controller/users.js";
import { verifyJwt } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/savedRecipe", verifyJwt, getRecipe);

router.put("/:userId/savedRecipe", verifyJwt, updateSavedRecipe);

export default router;
