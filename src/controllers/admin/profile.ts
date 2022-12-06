import { Request, Response } from "express";
import { fetchUser } from "../../services";

export const handleGetAdminProfile = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request?.user?.id as string;
    const admin = await fetchUser({ id: id });
    response.status(200).json({ message: "Success", ...admin });
  } catch (error) {
    response.status(500).json({ error: "Failed to get profile" });
  }
};
