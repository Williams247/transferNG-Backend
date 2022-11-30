import mongoose from "mongoose";
import { UserSchemaProps } from "../utils/types/db-schemas";

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
  coachProfile: {
    type: Schema.Types.ObjectId,
    ref: "coachProfile",
  },
  footballerProfile: {
    type: Schema.Types.ObjectId,
    ref: "footballerProfile",
  },
});

export const UserModel: mongoose.Model<UserSchemaProps, {}> = mongoose.model(
  "user",
  userSchema
);
