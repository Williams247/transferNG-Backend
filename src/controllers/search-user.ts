import { Request, Response } from "express";
import { UserModel } from "../models";

export const handleSeachUser = async (request: Request, response: Response) => {
  try {
    const {
      query: { page = 1, limit = 10, firstname, surname, email, role },
    } = request;

    const pageValue = Number(page);
    const limitValue = Number(limit);

    let searchQueries = {};

    searchQueries = {
      ...(firstname && { firstname }),
      ...(surname && { surname }),
      ...(email && { email }),
      ...(role && { role }),
    };

    const users = await UserModel.find(searchQueries)
      .select("-password -footballerPersonalData -coachPersonalData")
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue);

    const count = await UserModel.count();

    response.status(200).json({
      message: "Success",
      results: {
        totalUsers: count,
        data: users,
        page: pageValue,
        limit: limitValue,
      },
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to search for users" });
  }
};

export const handleGetUserById = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      params: { id },
    } = request;
    const user = await UserModel.findById(id).select("-password");
    response.status(200).json({ message: "Success", result: user });
  } catch (error) {
    response.status(500).json({ error: "Failed to find user" });
  }
};
