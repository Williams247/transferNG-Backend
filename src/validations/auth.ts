import Joi from "joi";
import {
  ValidateFootballerRegProps,
  ValidateFootballerLoginProps,
} from "../types/auth-validations";

export const validateFootballerReg = (
  data: ValidateFootballerRegProps
): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(30),
    surname: Joi.string().required().min(3).max(30),
    dob: Joi.string().required().max(8),
    videoLink: Joi.string().max(280),
    nationality: Joi.string().required(),
    languages: Joi.string().required(),
    height: Joi.string().required().max(10),
    weight: Joi.string().required().max(10),
    bestPosition: Joi.string().required(),
    foot: Joi.string().required().max(280),
    shortBiography: Joi.string().max(500),
    currentCity: Joi.string().required().max(80),
    phoneNumber: Joi.string().required().max(80),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .max(80),
    password: Joi.string().required().min(4).max(80),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .error(new Error("password does not match."))
      .min(4)
      .max(80),
    instagramLink: Joi.string().max(280),
    twitterLink: Joi.string().max(280),
    previousClub: Joi.string().max(60),
    clubJoined: Joi.string(),
    contractExpired: Joi.string(),
  });
  return schema.validate(data);
};

export const ValidateFooballerLogin = (
  data: ValidateFootballerLoginProps
): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .max(80),
    password: Joi.string().required().min(4).max(80),
  });
  return schema.validate(data);
};
