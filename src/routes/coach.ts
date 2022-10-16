import express, { Router } from "express";
import { handleGetCoachProfile } from "../controllers";
import { AuthCoach } from "../middleware";

const router: Router = express.Router();

router.get("/profile", AuthCoach, handleGetCoachProfile);

export const coachRoutes = router;
