import { Request, Response } from "express";
import bycript from "bcryptjs";
import { ValidateCoachReg } from "../../../utils";
import { ResponseProps, handleVetAgeRange } from "../../../utils";
import { UserModel } from "../../../models";
import { mailCheckService } from "../../../services";

export const handleRegisterCoach = async (
  request: Request,
  response: Response
) => {
  try {
    const { body } = request;

    const validateCoachRegistration = ValidateCoachReg(body);
    if (validateCoachRegistration.error) {
      response
        .status(400)
        .json({ error: validateCoachRegistration.error.message });
      return;
    }

    const vetResponse = await mailCheckService({ email: body.email });
    if (!vetResponse.success) {
      response.status(409).json({ error: "Email taken" });
      return;
    }

    const vetAgeResponse = (await handleVetAgeRange({
      min: 25,
      max: 76,
      dob: body.dob,
      user: "coach",
    })) as ResponseProps;

    if (vetAgeResponse?.message) {
      response
        .status(vetAgeResponse?.status)
        .json({ error: vetAgeResponse?.message });
      return;
    }

    const hashPassword: string = await bycript.hash(body.password, 10);

    const user = new UserModel({
      firstname: body.firstname,
      surname: body.surname,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: hashPassword,
      role: "coach",
      coachPersonalData: {
        dob: new Date(body.dob).toISOString(),
        currentTeam: body.currentTeam,
        formerTeam: body.formerTeam,
        language: body.language,
        nationality: body.nationality,
        currentCity: body.currentCity,
        licenses: {
          url: body.licenses.url,
        },
        dipolma: {
          url: body.dipolma.url,
        },
        otherTraining: {
          url: body.otherTraining.url,
        },
      },
    });

    await user.save();

    response.status(201).json({
      message: "Congratulations, account created",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Sorry, registration process failed" });
  }
};
