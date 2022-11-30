import JWT from "jsonwebtoken";
import { UserModel } from "../models";
import { LoginParams, ValidateLogin, UserLoginPayload } from "../utils";

import bcrypt from "bcryptjs";

export const handleVetLogin = async ({ email, password }: LoginParams) => {
  try {
    const validateAdminLogin = ValidateLogin({ email, password });
    if (validateAdminLogin.error) {
      return {
        isSuccess: false,
        error: validateAdminLogin.error.message,
        status: 401,
      };
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        isSuccess: false,
        error: "Email or password does not exist",
        status: 404,
      };
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!doesPasswordMatch) {
      return {
        isSuccess: false,
        error: "Email or password does not exist",
        status: 404,
      };
    }

    const payload: UserLoginPayload = {
      id: user._id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      role: user.role,
    };

    const token: string = await JWT.sign(
      payload,
      process.env.SECRET as string,
      { expiresIn: 3600 * 24 * 5 }
    );

    return {
      isSuccess: true,
      message: "Login successful",
      status: 200,
      result: {
        token: token,
        user: payload,
      },
    };
  } catch (error) {
    throw error;
  }
};
