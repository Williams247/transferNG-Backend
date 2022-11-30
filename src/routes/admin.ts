import express, { Router } from "express";
import { handleGetAdminProfile } from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get("/profile", Auth({ userType: "admin" }), handleGetAdminProfile);

export const adminRoutes = router;
