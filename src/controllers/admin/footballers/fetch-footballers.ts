import { Request, Response } from "express";
import { UserModel } from "../../../models";

export const handleFetchFootballers = (
  request: Request,
  response: Response
) => {
  try {
    // Create a service for this type of action for coach and footballer
    const footballers = UserModel.find({ role: "footballer" });
    response.status(200).json({ message: "Success", results: footballers });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch footballers" });
  }
};
