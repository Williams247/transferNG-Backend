import { Request, Response } from "express";
import { fetchUsers, fetchProfile } from "../../../services";

export const handleFetchUsers = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      query: { role, limit = 10, page = 1 },
    } = request;

    if (!role) {
      response.status(401).json({ error: "Provide a role" });
      return;
    }

    if (Number(page) < 1) {
      response
        .status(400)
        .json({ error: "Page value should not be less than 1" });
      return;
    }

    const res = await fetchUsers({
      role: role as string,
      pagination: { limit: Number(limit), page: Number(page) },
    });

    response.status(200).json({ message: "Success", ...res });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch footballers" });
  }
};

export const handleFindUser = async (request: Request, response: Response) => {
  try {
    const {
      query: { id, userType },
    } = request;
    if (!id) {
      response.status(401).json({ error: "Provide an id to find a user" });
      return;
    }

    const user = await fetchProfile({
      userType: userType as string,
      id: id as string,
    });

    response.status(200).json({ message: "User fetched", ...user });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch user" });
  }
};
