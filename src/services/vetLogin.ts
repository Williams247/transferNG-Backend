import { FootballerModel, CoachModel } from "../models";
import bcrypt from "bcryptjs";

interface LoginServiceProps {
  email: string;
  password: string;
  userType: string;
}

export const vetLoginService = async ({
  email,
  password,
  userType,
}: LoginServiceProps) => {
  if (userType === "footballer") {
    try {
      const user = await FootballerModel.findOne({ email: email });
      if (!user)
        return {
          isSuccess: false,
          error: "Email or password does not exist",
          status: 404,
        };
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
      if (!doesPasswordMatch)
        return {
          isSuccess: false,
          error: "Email or password does not exist",
          status: 401,
        };
      return {
        isSuccess: true,
        messageResponse: "Login successful",
        status: 200,
        data: user,
      };
    } catch (error) {
      throw error;
    }
  } else if (userType === "coach") {
    try {
      const user = await CoachModel.findOne({ email: email });
      if (!user)
        return {
          isSuccess: false,
          error: "Email or password does not exist",
          status: 404,
        };
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
      if (!doesPasswordMatch)
        return {
          isSuccess: false,
          error: "Email or password does not exist",
          status: 401,
        };
      return {
        isSuccess: true,
        messageResponse: "Login successful",
        status: 200,
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
};
