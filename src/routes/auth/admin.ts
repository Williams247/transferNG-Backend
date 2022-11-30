import express, { Router } from "express";
import { handleRegisterAdmin, handleLoginAdmin } from "../../controllers";

const router: Router = express.Router();

router.post("/register", handleRegisterAdmin);
router.post("/login", handleLoginAdmin);

export default router;
