import express, { Router } from "express";
import { handleGetFootBallerProfile } from "../controllers";
import { AuthFootballer } from "../middleware";

const router: Router = express.Router();

router.get("/profile", AuthFootballer, handleGetFootBallerProfile);

export const footballerRoutes = router;
