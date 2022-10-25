import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { vetLoginService } from "../../../services";
import { UserProp } from "../../../utils";
import { ValidateCoachLogin } from "../../../utils/validations/auth";

export const handleLoginCoach = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { body } = request;
    const coachLogin = ValidateCoachLogin(body);

    if (coachLogin.error) {
      response.status(400).json({ error: coachLogin.error.message });
      return;
    }

    const dataResponse: any = await vetLoginService({
      email: body.email,
      password: body.password,
      userType: "coach",
    });

    const { isSuccess, error, status, data, messageResponse } = dataResponse;
    if (!isSuccess) {
      response.status(status).json({ error: error });
      return;
    }

    const payload: UserProp = {
      id: data._id,
      firstname: data.firstname,
      surname: data.surname,
      email: data.email,
      role: data.role,
    };

    const token: string = await JWT.sign(
      payload,
      process.env.SECRET as string,
      { expiresIn: 3600 * 24 * 5 }
    );

    response.status(status).json({
      message: messageResponse,
      result: {
        userData: payload,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to login" });
  }
};
