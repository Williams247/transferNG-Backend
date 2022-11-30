import { Request, Response } from "express";
import { fetchProfile } from "../../services";

export const handleGetAdminProfile = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request?.user?.id as string;
    const admin = await fetchProfile({ id: id, userType: "admin" });
    response.status(200).json({ message: "Success", result: admin });
  } catch (error) {
    response.status(500).json({ error: "Failed to get profile" });
  }
};
