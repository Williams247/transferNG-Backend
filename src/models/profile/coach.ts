import mongoose from "mongoose";
import { CoachSchemaProps } from "../../utils";

const Schema = mongoose.Schema;

const coach = new Schema<CoachSchemaProps>({
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
  formerTeam: {
    type: String,
    required: true,
  },
  currentTeam: {
    type: String,
    required: true,
  },
  keyArchievements: String,
  currentCity: {
    type: String,
    required: true,
  },
  licenses: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  dipolma: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
  },
  otherTraining: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

export const CoachModel: mongoose.Model<CoachSchemaProps, {}> = mongoose.model(
  "coachProfile",
  coach
);
