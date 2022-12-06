import { UserModel } from "../models";
import { PaginationProps, UserSchemaProps } from "../utils";

interface Props {
  firstname?: string;
  surname?: string;
  email?: string;
  role: string;
  pagination: PaginationProps;
}

export const fetchUser = async ({ id }: { id: string }) => {
  try {
    const user = (await UserModel.findById(id).select(
      "-password"
    )) as UserSchemaProps;
    return { result: user };
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async ({
  firstname,
  surname,
  email,
  role,
  pagination,
}: Props) => {
  try {
    const { limit, page } = pagination;

    let searchQueries = {};

    searchQueries = {
      ...(firstname && { firstname }),
      ...(surname && { surname }),
      ...(email && { email }),
      ...(role && { role }),
    };

    const users = (await UserModel.find({ ...searchQueries })
      .select("-password -coachPersonalData -footballerPersonalData")
      .limit(limit)
      .skip((page - 1) * limit)) as UserSchemaProps[];
    const count = await UserModel.count();

    return {
      result: {
        page: page,
        totalUsers: count,
        totalPages: Math.ceil(count / limit),
        users: users,
      },
    };
  } catch (error) {
    throw error;
  }
};
