import mongoose from "mongoose";
import { UserSchemaProps } from "../utils/types/db-schemas";

const Schema = mongoose.Schema;

const userSchema = new Schema<UserSchemaProps>(
  {
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
    profile: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("fromcoach", {
  ref: "coach",
  localField: "profile",
  foreignField: "_id",
  justOne: true,
});

userSchema.virtual("fromfootballer", {
  ref: "footballer",
  localField: "profile",
  foreignField: "_id",
  justOne: true,
});

export const UserModel: mongoose.Model<UserSchemaProps, {}> = mongoose.model(
  "user",
  userSchema
);
