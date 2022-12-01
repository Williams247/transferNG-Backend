import { Request, Response } from "express";
import { handleFindUsers } from "../../../services";

export const handleFetchFootballers = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      query: { role, limit = 5, page = 1 },
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

    const res = await handleFindUsers({
      role: role as string,
      pagination: { limit: Number(limit), page: Number(page) },
    });

    response.status(200).json({ message: "Success", ...res });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch footballers" });
  }
};
