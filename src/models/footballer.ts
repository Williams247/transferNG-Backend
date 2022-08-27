import mongoose from "mongoose";
import { FootBallerSchemaProps } from '../types/db-schemas'

const Schema = mongoose.Schema;

const footballer = new Schema<FootBallerSchemaProps>({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  surname: {
    type: String,
    required: true,
    min: 3,
    max: 30,
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
  linkendinProfile: String,
  instagramLink: String,
  twitterLink: String,
  previousClub: String,
  clubJoined: String,
  contractExpired: String,
});

export default mongoose.model<FootBallerSchemaProps>("footballer", footballer);
