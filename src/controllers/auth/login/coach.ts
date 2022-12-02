import { Request, Response } from "express";
import { LoginVetEmailServiceResponse } from "../../../utils";
import { vetAndLogin } from "../../../services";

export const handleLoginCoach = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { body } = request;

    const dataResponse: LoginVetEmailServiceResponse = await vetAndLogin(body);

    const { isSuccess, error, status, result, message } = dataResponse;
    if (!isSuccess) {
      response.status(status).json({ error: error });
      return;
    }

    response.status(status).json({ message, result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to login" });
  }
};
