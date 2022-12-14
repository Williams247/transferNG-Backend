import { Request, Response } from "express";
import bycript from "bcryptjs";
import { ValidateCoachReg } from "../../../utils";
import { ResponseProps, handleVetAgeRange } from "../../../utils";
import { UserModel } from "../../../models";
import { mailCheckService, phoneNumberCheckService } from "../../../services";

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

    const vetPhoneNumber = await phoneNumberCheckService({
      phoneNumber: body.phoneNumber,
    });

    if (!vetPhoneNumber.success) {
      response.status(409).json({ error: "Phone number taken" });
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
          publicId: body.licenses.publicId,
          url: body.licenses.url,
        },
        diploma: {
          publicId: body.diploma.publicId,
          url: body.diploma.url,
        },
        otherTraining: {
          publicId: body.otherTraining.publicId,
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
