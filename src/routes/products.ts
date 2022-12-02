import express, { Router } from "express";
import { handleGetProducts } from "../controllers";

const router: Router = express.Router();

router.get("/all", handleGetProducts);

export const productRoutes = router;
