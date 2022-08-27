import 'dotenv/config'
import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use((request: Request, response: Response, next: NextFunction): void => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // Set to a wild card by default but can be changed
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type"
  );
  next();
});

app.use(routes);

app.use((request: Request, response: Response): void => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(8000, async (): Promise<void> => {
  try {
    mongoose.connect("mongodb://localhost:27017/transferng");
    console.log("Connection established");
  } catch (error) {
    console.log(error);
  }
});
