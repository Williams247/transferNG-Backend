import "dotenv/config";
import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";
import { UserProp } from "./utils";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: UserProp;
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

const dbUri =
  process.env.NODE_ENV === "Production"
    ? process.env.REMOTE_URI
    : process.env.LOCAL_URI;
const port = process.env.PORT;

app.listen(port as string, async (): Promise<void> => {
  try {
    mongoose.connect(dbUri as string);
    if (process.env.NODE_ENV === "Production") {
      console.log("Connection established");
    } else {
      console.log(`App running on http://localhost:${port as string}`);
    }
  } catch (error) {
    console.log(error);
  }
});
