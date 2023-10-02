import express from "express";
import { getGame, updateGame } from "../controllers/game.js";

const router = express.Router();

router.get("/", getGame);
router.post("/", updateGame);

export default router;
