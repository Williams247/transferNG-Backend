import express, { Router } from "express";
import { multerConfig } from "../../utils";
import { handleRegisterCoach, handleLoginCoach } from "../../controllers";

const router: Router = express.Router();

router.post("/register", multerConfig.array("image", 4), handleRegisterCoach);
router.post("/login", handleLoginCoach);

export default router;
