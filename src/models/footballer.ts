import mongoose from "mongoose";
import { FootBallerSchemaProps } from "../utils/types/db-schemas";

const Schema = mongoose.Schema;

const footballer = new Schema<FootBallerSchemaProps>({
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
  dob: {
    type: String,
    required: true,
  },
  videoLink: String,
  nationality: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  bestPosition: {
    type: String,
    required: true,
  },
  foot: {
    type: String,
    required: true,
  },
  shortBiography: String,
  currentCity: {
    type: String,
    required: false,
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
  linkedinProfileLink: String,
  instagramProfileLink: String,
  twitterProfileLink: String,
  previousClub: String,
  clubJoined: String,
  contractExpired: String,
});

export const FootballerModel: mongoose.Model<FootBallerSchemaProps, {}> =
  mongoose.model<FootBallerSchemaProps>("footballer", footballer);
