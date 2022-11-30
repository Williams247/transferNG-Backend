import { Request, Response } from "express";
import { fetchProfile } from "../../services";

export const handleGetCoachProfile = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request?.user?.id as string;
    const coachProfile = await fetchProfile({ id: id, userType: "coach" });
    response.status(200).json({
      message: "Profile fetched",
      result: coachProfile,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get coach profile" });
  }
};
