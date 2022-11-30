import { Request, Response } from "express";
import { LoginVetEmailServiceResponse } from "../../../utils";
import { handleVetLogin } from "../../../services";

export const handleLoginPlayer = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { body } = request;

    const dataResponse: LoginVetEmailServiceResponse = await handleVetLogin(
      body
    );

    const { isSuccess, error, status, data, message } = dataResponse;
    if (!isSuccess) {
      response.status(status).json({ error: error });
      return;
    }

    response.status(status).json({ message, data });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to login" });
  }
};
