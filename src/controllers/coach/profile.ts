import { Request, Response, NextFunction } from "express";
import { profile } from "../../services";

export const handleGetCoachProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request?.user?.id as string;
    const coachProfile = await profile(userId, "coach");
    response.status(200).json({
      message: "Profile fetched",
      result: coachProfile,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get coach profile" });
  }
};
