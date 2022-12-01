import { UserModel } from "../models";
import { UserSchemaProps } from "../utils";

interface Props {
  id: string;
  userType: string;
}

export const fetchProfile = async ({ id, userType }: Props) => {
  if (userType === "admin") {
    try {
      return (await UserModel.findById(id).select(
        "-password"
      )) as UserSchemaProps;
    } catch (error) {
      throw error;
    }
  }

  if (userType === "coach") {
    try {
      const coach = (await UserModel.findById(id).select(
        "-password"
      )) as UserSchemaProps;
      return {
        _id: coach._id,
        firstname: coach.firstname,
        surname: coach.surname,
        email: coach.email,
        phoneNumber: coach.phoneNumber,
        role: coach.role,
        ...coach.coachPersonalData,
      };
    } catch (error) {
      throw error;
    }
  }

  if (userType === "footballer") {
    try {
      const footballer = (await UserModel.findById(id).select(
        "-password"
      )) as UserSchemaProps;

      return {
        _id: footballer._id,
        firstname: footballer.firstname,
        surname: footballer.surname,
        email: footballer.email,
        phoneNumber: footballer.phoneNumber,
        role: footballer.role,
        ...footballer.footballerPersonalData,
      };
    } catch (error) {
      throw error;
    }
  }
};
