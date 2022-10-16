import Joi from "joi";
import {
  ValidateFootballerRegProps,
  ValidateFootballerLoginProps,
  validateCoachRegProps,
} from "../types/auth-validations";

// Footballer registration schema validation
export const validateFootballerReg = (
  data: ValidateFootballerRegProps
): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(80),
    surname: Joi.string().required().min(3).max(80),
    dob: Joi.string().required(),
    videoLink: Joi.string(),
    nationality: Joi.string().required(),
    languages: Joi.string().required(),
    height: Joi.string().required().max(5),
    weight: Joi.string().required().max(5),
    bestPosition: Joi.string().required(),
    foot: Joi.string().required(),
    shortBiography: Joi.string(),
    currentCity: Joi.string().required(),
    phoneNumber: Joi.string().required(),
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
    previousClub: Joi.string(),
    clubJoined: Joi.string(),
    contractExpired: Joi.string(),
  });
  return schema.validate(data);
};

// Footballer login schema validation
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

// Register coach
export const validateCoachReg = (
  data: validateCoachRegProps
): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(80),
    surname: Joi.string().required().min(3).max(80),
    dob: Joi.string().required(),
    videoLink: Joi.string().max(280),
    nationality: Joi.string().required(),
    languages: Joi.string().required(),
    formerTeams: Joi.string().required(),
    currentTeam: Joi.string().required(),
    keyArchievements: Joi.string().max(500),
    currentCity: Joi.string().required(),
    phoneNumber: Joi.string().required(),
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
  });
  return schema.validate(data);
};

// Coach login schema validation
export const ValidateCoachLogin = (
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
