import mongoose from "mongoose";
import { CoachSchemaProps } from '../types/db-schemas'

const Schema = mongoose.Schema;

const coach = new Schema<CoachSchemaProps>({
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
  formerTeams: {
    type: String,
    required: true
  },
  currentTeam: {
    type: String,
    required: true
  },
  keyArchievements: String,
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
    required: true
  },
  licensesCertificate: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true }
  },
  dipolmaCertificate: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true }
  },
  otherTrainingCertifications: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true }
  }
});

export default mongoose.model<CoachSchemaProps>("coach", coach);
