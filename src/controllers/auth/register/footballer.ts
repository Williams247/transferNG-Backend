import { Request, Response } from "express";
import bycript from "bcryptjs";
import { UserModel } from "../../../models";
import { mailCheckService } from "../../../services";
import { ResponseProps, handleVetAgeRange } from "../../../utils";
import { validateFootballerReg } from "../../../utils";

export const handleRegisterPlayer = async (
  request: Request,
  response: Response
) => {
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

    const user = new UserModel({
      firstname: body.firstname,
      surname: body.surname,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: hashPassword,
      role: "footballer",
      footballerPersonalData: {
        dob: new Date(body.dob).toISOString(),
        videoLink: body.videoLink,
        nationality: body.nationality,
        language: body.language,
        height: body.height,
        weight: body.weight,
        bestPosition: body.bestPosition,
        foot: body.foot,
        currentCity: body.currentCity,
        previousClub: body.previousClub,
        clubJoined: body.clubJoined,
        instagramProfileLink: body.instagramProfileLink,
        linkedinProfileLink: body.linkedinProfileLink,
        twitterProfileLink: body.twitterProfileLink,
        contractExpired: new Date(body.contractExpired).toISOString(),
      },
    });

    await user.save();

    response.status(201).json({ message: "Congratulations, account created" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Sorry, registration process failed" });
  }
};
