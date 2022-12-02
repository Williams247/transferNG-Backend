import express, { Router } from "express";
import {
  handleGetAdminProfile,
  handleFindUser,
  handleFetchUsers,
  handleAddProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "../controllers";
import { Auth } from "../middleware";

const router: Router = express.Router();

router.get("/profile", Auth({ userType: "admin" }), handleGetAdminProfile);
router.get("/fetch-users", Auth({ userType: "admin" }), handleFetchUsers);
router.get("/fetch-profile", Auth({ userType: "admin" }), handleFindUser);

router.post("/add-product", Auth({ userType: "admin" }), handleAddProduct);

router.put("/edit-product", Auth({ userType: "admin" }), handleUpdateProduct);

router.delete(
  "/delete-product",
  Auth({ userType: "admin" }),
  handleDeleteProduct
);

export const adminRoutes = router;
