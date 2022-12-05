import express, { Application } from "express";
import authAdmin from "./auth/admin";
import authCoach from "./auth/coach";
import authFootballer from "./auth/footballer";
import cloudinaryFile from "./cloudinary";
import { adminRoutes } from "./admin";
import { coachRoutes } from "./coach";
import { productRoutes } from "./products";
import { footballerRoutes } from "./footballer";
import { userRoute } from "./user";

const appRouter: Application = express();

// Auth routes
appRouter.use("/auth/footballer", authFootballer);
appRouter.use("/auth/coach", authCoach);
appRouter.use("/auth/admin", authAdmin);

// Users routes
appRouter.use("/footballer", footballerRoutes);
appRouter.use("/coach", coachRoutes);
appRouter.use("/admin", adminRoutes);
appRouter.use("/user", userRoute);

// Product route
appRouter.use("/product", productRoutes);

// Cloudinary routes
appRouter.use(cloudinaryFile);

export default appRouter;
