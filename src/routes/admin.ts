import express, { Router } from "express";
import {
  handleGetAdminProfile,
  handleFetchUsers,
  handleAddProduct,
} from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get("/profile", Auth({ userType: "admin" }), handleGetAdminProfile);
router.get("/fetch-users", Auth({ userType: "admin" }), handleFetchUsers);
router.post("/add-product", Auth({ userType: "admin" }), handleAddProduct);

export const adminRoutes = router;
