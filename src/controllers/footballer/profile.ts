import { Request, Response } from "express";
import { fetchProfile } from "../../services";

export const handleGetFootBallerProfile = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request?.user?.id as string;
    const footballerProfile = await fetchProfile({
      id: id,
      userType: "footballer",
    });
    response.status(200).json({
      message: "Profile fetched",
      result: footballerProfile,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get footballer profile" });
  }
};
