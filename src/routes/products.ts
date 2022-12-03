import express, { Router } from "express";
import { handleGetProducts, handleGetProduct } from "../controllers";

const router: Router = express.Router();

router.get("/all", handleGetProducts);
router.get("/:id", handleGetProduct);

export const productRoutes = router;
