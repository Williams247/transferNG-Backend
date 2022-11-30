import mongoose from "mongoose";
import { FootBallerSchemaProps } from "../../utils";

const Schema = mongoose.Schema;

const footballer = new Schema<FootBallerSchemaProps>({
  dob: {
    type: String,
    required: true,
  },
  videoLink: String,
  nationality: {
    type: String,
    required: true,
  },
  language: {
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
  linkedinProfileLink: {
    type: String,
    required: true,
  },
  instagramProfileLink: {
    type: String,
    required: true,
  },
  twitterProfileLink: {
    type: String,
    required: true,
  },
  previousClub: {
    type: String,
    required: true,
  },
  clubJoined: {
    type: String,
    required: true,
  },
  contractExpired: {
    type: String,
    required: true,
  },
});

export const FootballerModel: mongoose.Model<FootBallerSchemaProps, {}> =
  mongoose.model("footballerProfile", footballer);
