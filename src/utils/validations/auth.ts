import Joi from "joi";
import {
  ValidateFootballerRegProps,
  ValidateCoachRegProps,
  ValidateAdminRegProps,
  ValidateLoginProps,
} from "../types";
import { Domains } from "../constants";

// Footballer registration schema validation
export const validateFootballerReg = (data: ValidateFootballerRegProps) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(2).max(80),
    surname: Joi.string().required().min(2).max(80),
    dob: Joi.string().required(),
    videoLink: Joi.string(),
    nationality: Joi.string().required(),
    language: Joi.string().required(),
    height: Joi.string().required().max(5),
    weight: Joi.string().required().max(5),
    bestPosition: Joi.string().required(),
    foot: Joi.string().required(),
    shortBiography: Joi.string(),
    currentCity: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .max(80),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .error(new Error("password does not match."))
      .min(4)
      .max(80),
    instagramProfileLink: Joi.string(),
    linkedinProfileLink: Joi.string(),
    twitterProfileLink: Joi.string(),
    previousClub: Joi.string(),
    clubJoined: Joi.string(),
    contractExpired: Joi.string(),
  });
  return schema.validate(data);
};

// Login schema validation for footballer coach and admin
export const ValidateLogin = (data: ValidateLoginProps) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .max(80),
    password: Joi.string().required().min(4).max(80),
  });
  return schema.validate(data);
};

// Register coach
export const ValidateCoachReg = (data: ValidateCoachRegProps) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(80),
    surname: Joi.string().required().min(3).max(80),
    dob: Joi.string().required(),
    videoLink: Joi.string().max(280),
    nationality: Joi.string().required(),
    language: Joi.string().required(),
    formerTeam: Joi.string().required(),
    currentTeam: Joi.string().required(),
    keyArchievements: Joi.string().max(500),
    currentCity: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .max(80),
    password: Joi.string().required().min(4).max(80),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .error(new Error("password does not match."))
      .min(4)
      .max(80),
    licenses: Joi.object()
      .required()
      .min(2)
      .max(2)
      .keys({
        publicId: Joi.string()
          .required()
          .error(new Error("Licenses Certificate id is required")),
        url: Joi.string()
          .required()
          .error(new Error("Licenses Certificate url is required")),
      }),
    diploma: Joi.object()
      .required()
      .min(2)
      .max(2)
      .keys({
        publicId: Joi.string()
          .required()
          .error(new Error("diploma Certificate id is required")),
        url: Joi.string()
          .required()
          .error(new Error("Diploma Certificate url is required")),
      }),
    otherTraining: Joi.object()
      .required()
      .min(2)
      .max(2)
      .keys({
        publicId: Joi.string()
          .required()
          .error(new Error("Other Training Certificate id is required")),
        url: Joi.string()
          .required()
          .error(new Error("Other Training Certificate url is required")),
      }),
  });
  return schema.validate(data);
};

// Register admin schema
export const ValidateAdminReg = (data: ValidateAdminRegProps) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(2).max(80),
    surname: Joi.string().required().min(2).max(80),
    phoneNumber: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: Domains },
      })
      .max(80),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
