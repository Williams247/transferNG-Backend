import express, { Router } from "express";
import { handleSeachUser, handleGetUserById } from "../controllers";

const router: Router = express.Router();

router.get("/search", handleSeachUser);
router.get("/get-user/:id", handleGetUserById);

export const userRoute = router;
