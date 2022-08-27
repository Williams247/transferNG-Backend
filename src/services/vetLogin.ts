import { FootBaller } from "../models";
import bcrypt from "bcryptjs";

interface LoginServiceProps {
  email: string;
  password: string;
  userType: string
}

export const vetLoginService = async ({ email, password, userType }: LoginServiceProps) => {
  if (userType === 'footballer') {
    try {
      const user = await FootBaller.findOne({ email: email });
      if (!user)
        return {
          isSuccess: false,
          error: "Email or password does not exist",
          status: 401,
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
    return
  }
};
