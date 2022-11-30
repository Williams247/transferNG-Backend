import express, { Router } from "express";
import { handleGetFootBallerProfile } from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get(
  "/profile",
  Auth({ userType: "footballer" }),
  handleGetFootBallerProfile
);

export const footballerRoutes = router;
