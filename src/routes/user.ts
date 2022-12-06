import express from "express";
import { handleFetchUser, handleFetchUsers } from "../controllers";

const router = express.Router();

router.get("/find-users", handleFetchUsers);
router.get("/profile", handleFetchUser);

export const userRoute = router;
