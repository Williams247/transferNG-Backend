import { Request, Response } from "express";
import { fetchUsers, fetchUser } from "../../services";
import { UserProfile } from "../../utils";

export const handleFetchUsers = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      query: {
        role,
        firstname,
        surname,
        email,
        phoneNumber,
        page = 1,
        limit = 10,
      },
    } = request;

    const pageValue = Number(page);
    const limitValue = Number(limit);

    if (pageValue < 1) {
      response
        .status(400)
        .json({ error: "Page value should not be less than 1" });
      return;
    }

    const searchProps = {
      role,
      firstname,
      surname,
      email,
      phoneNumber,
    } as UserProfile;

    const res = await fetchUsers({
      ...searchProps,
      pagination: { page: pageValue, limit: limitValue },
    });

    response.status(200).json({ message: "Success", ...res });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch footballers" });
  }
};

export const handleFetchUser = async (request: Request, response: Response) => {
  try {
    const {
      query: { id },
    } = request;

    if (!id) {
      response.status(401).json({ error: "Provide an id to find a user" });
      return;
    }

    const user = await fetchUser({
      id: id as string,
    });

    response.status(200).json({ message: "User fetched", ...user });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch user" });
  }
};
