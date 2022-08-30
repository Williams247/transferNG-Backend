import express, { Router } from "express";
const upload = require("../../utils/multer");
import { handleRegisterCoach } from "../../controllers/auth/register";
import { handleLoginCoach } from "../../controllers/auth/login"

const router: Router = express.Router();

router.post("/register", upload.array("image", 4), handleRegisterCoach);
router.post("/login", handleLoginCoach)

export default router;
