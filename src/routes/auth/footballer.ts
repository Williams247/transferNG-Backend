import express, { Router } from "express";
import { handleLoginPlayer, handleRegisterPlayer } from "../../controllers";

const router: Router = express.Router();

router.post("/register", handleRegisterPlayer);
router.post("/login", handleLoginPlayer);

export default router;
