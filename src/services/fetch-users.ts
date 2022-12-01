import { UserModel } from "../models";
import { PaginationProps } from "../utils";

interface Props {
  role: string;
  pagination: PaginationProps;
}

export const handleFindUsers = async ({ role, pagination }: Props) => {
  try {
    const { limit, page } = pagination;
    const users = await UserModel.find({ role })
      .select("-password")
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await UserModel.count();
    return {
      result: {
        currentPage: page,
        totalUsers: count,
        totalPages: Math.ceil(count / limit),
        users: users.map((i) => {
          return {
            _id: i._id,
            firstname: i.firstname,
            surname: i.surname,
            email: i.email,
            phoneNumber: i.phoneNumber,
            role: i.role,
          };
        }),
      },
    };
  } catch (error) {
    throw error;
  }
};
