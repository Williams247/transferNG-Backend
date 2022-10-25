import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { vetLoginService } from "../../../services";
import { ValidateFooballerLogin } from "../../../utils/validations/auth";

import { UserProp } from "../../../utils";

export const handleLoginPlayer = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { body } = request;
    const validateFootallerLogin = ValidateFooballerLogin(body);

    if (validateFootallerLogin.error) {
      response
        .status(400)
        .json({ error: validateFootallerLogin.error.message });
      return;
    }

    const dataResponse: any = await vetLoginService({
      email: body.email,
      password: body.password,
      userType: "footballer",
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
