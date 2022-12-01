import express, { Router } from "express";
import { handleGetAdminProfile, handleFetchFootballers } from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get("/profile", Auth({ userType: "admin" }), handleGetAdminProfile);
router.get("/fetch-users", Auth({ userType: "admin" }), handleFetchFootballers);

export const adminRoutes = router;
