import { Request, Response, NextFunction } from "express";
import { profile } from "../../services";

export const handleGetFootBallerProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request?.user?.id as string;
    const footballerProfile = await profile(userId, "footballer");
    response.status(200).json({
      message: "Profile fetched",
      result: footballerProfile,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get footballer profile" });
  }
};
