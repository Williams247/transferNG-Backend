import express, { Router } from "express";
import { handleGetCoachProfile } from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get("/profile", Auth({ userType: "coach" }), handleGetCoachProfile);

export const coachRoutes = router;
