import express, { Application } from "express";
import authCoach from "./auth/coach";
import authFootballer from "./auth/footballer";
import { footballerRoutes } from "./footballer";
import { coachRoutes } from "./coach";

const appRouter: Application = express();

// Auth routes
appRouter.use("/auth/footballer", authFootballer);
appRouter.use("/auth/coach", authCoach);

appRouter.use("/footballer", footballerRoutes);
appRouter.use("/coach", coachRoutes);

export default appRouter;
