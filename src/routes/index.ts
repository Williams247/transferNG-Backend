import express, { Application } from "express";
import authCoach from "./auth/coach";
import authFootballer from "./auth/footballer";
import authAdmin from "./auth/admin";
import cloudinaryFile from "./cloudinary";
import { footballerRoutes } from "./footballer";
import { coachRoutes } from "./coach";

const appRouter: Application = express();

// Auth routes
appRouter.use("/auth/footballer", authFootballer);
appRouter.use("/auth/coach", authCoach);
appRouter.use("/auth/admin", authAdmin);

appRouter.use("/footballer", footballerRoutes);
appRouter.use("/coach", coachRoutes);

appRouter.use(cloudinaryFile);

export default appRouter;
