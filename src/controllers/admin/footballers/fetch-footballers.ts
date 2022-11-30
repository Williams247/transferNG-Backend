import { Request, Response } from "express";
import { UserModel } from "../../../models";

export const handleFetchFootballers = (
  request: Request,
  response: Response
) => {
  try {
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch footballers" });
  }
};
