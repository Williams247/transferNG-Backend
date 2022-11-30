import express, { Router } from "express";
import { multerConfig } from "../utils";
import { handleUpload, handleDelete } from "../controllers";

const router: Router = express.Router();

router.post("/upload-file", multerConfig.single("file"), handleUpload);
router.delete("/delete-file", handleDelete);

export default router;
