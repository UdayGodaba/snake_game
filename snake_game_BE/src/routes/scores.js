import express from "express";
import { getTopScores, updateScore } from "../controllers/scores.js";

const router = express.Router();

router.get("/", getTopScores);
router.post("/", updateScore);

export default router;
