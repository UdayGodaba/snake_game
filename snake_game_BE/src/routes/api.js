import express from "express";

import auth from "./auth.js";
import game from "./game.js";
import scores from "./scores.js";
import { verifyToken } from "../utils/crypt.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/game", verifyToken, game);
router.use("/scores", verifyToken, scores);

export default router;
