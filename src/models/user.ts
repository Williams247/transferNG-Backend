import mongoose from "mongoose";
import { UserSchemaProps } from "../utils/types/schemas";

const Schema = mongoose.Schema;

const userSchema = new Schema<UserSchemaProps>({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 80,
  },
  surname: {
    type: String,
    required: true,
    min: 3,
    max: 80,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  coachPersonalData: {
    dob: String,
    videoLink: String,
    nationality: String,
    language: String,
    formerTeam: String,
    currentTeam: String,
    keyArchievements: String,
    currentCity: String,
    licenses: {
      publicId: String,
      url: String,
    },
    diploma: {
      publicId: String,
      url: String,
    },
    otherTraining: {
      publicId: String,
      url: String,
    },
  },
  footballerPersonalData: {
    dob: String,
    videoLink: String,
    nationality: String,
    language: String,
    height: String,
    weight: String,
    bestPosition: String,
    foot: String,
    shortBiography: String,
    currentCity: String,
    linkedinProfileLink: String,
    instagramProfileLink: String,
    twitterProfileLink: String,
    previousClub: String,
    clubJoined: String,
    contractExpired: String,
  },
});

export const UserModel: mongoose.Model<UserSchemaProps, {}> = mongoose.model(
  "user",
  userSchema
);
