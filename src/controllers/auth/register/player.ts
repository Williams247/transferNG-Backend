import { Request, Response } from "express";
import bycript from "bcryptjs";
import { FootballerModel } from "../../../models";
import { mailCheckService, handleVetAgeRange } from "../../../services";
import { ResponseProps } from "../../../utils";
import { validateFootballerReg } from "../../../utils/validations/auth";

export const handleRegisterPlayer = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { body } = request;
    const validateFootallerRegistration = validateFootballerReg(body);

    if (validateFootallerRegistration.error) {
      response
        .status(400)
        .json({ error: validateFootallerRegistration.error.message });
      return;
    }

    const vetResponse = await mailCheckService({ email: body.email });
    if (!vetResponse.success) {
      response.status(409).json({ error: "Email taken" });
      return;
    }

    const vetAgeResponse = (await handleVetAgeRange({
      min: 17,
      max: 46,
      dob: body.dob,
      user: "footballer",
    })) as ResponseProps;

    if (vetAgeResponse?.message) {
      response
        .status(vetAgeResponse?.status)
        .json({ error: vetAgeResponse?.message });
      return;
    }

    const hashPassword: string = await bycript.hash(body.password, 10);
    const createFootballer = new FootballerModel({
      ...body,
      role: "footballer",
      password: hashPassword,
    });

    await createFootballer.save();
    response.status(201).json({ message: "Footballer registered" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to register footaballer" });
  }
};
