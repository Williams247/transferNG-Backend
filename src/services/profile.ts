import { UserModel, CoachModel, FootballerModel } from "../models";
import {
  CoachSchemaProps,
  FootBallerSchemaProps,
  UserSchemaProps,
} from "../utils";

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
      const { _id, firstname, surname, phoneNumber, email, role, profile } =
        (await UserModel.findById(id).select("-password")) as UserSchemaProps;

      const {
        licenses,
        dipolma,
        otherTraining,
        dob,
        nationality,
        language,
        formerTeam,
        currentCity,
        currentTeam,
      } = (await CoachModel.findOne({ profile: id })) as CoachSchemaProps;

      return {
        _id,
        firstname,
        surname,
        phoneNumber,
        email,
        role,
        profile,
        licenses,
        dipolma,
        otherTraining,
        dob,
        nationality,
        language,
        formerTeam,
        currentCity,
        currentTeam,
      };
    } catch (error) {
      throw error;
    }
  }

  if (userType === "footballer") {
    try {
      const { _id, firstname, surname, phoneNumber, email, role, profile } =
        (await UserModel.findById(id).select("-password")) as UserSchemaProps;

      const {
        dob,
        videoLink,
        nationality,
        language,
        height,
        weight,
        bestPosition,
        foot,
        currentCity,
        previousClub,
        clubJoined,
        instagramProfileLink,
        twitterProfileLink,
        contractExpired,
      } = (await FootballerModel.findOne({
        profile: id,
      })) as FootBallerSchemaProps;

      return {
        _id,
        firstname,
        surname,
        phoneNumber,
        email,
        role,
        profile,
        dob,
        videoLink,
        nationality,
        language,
        height,
        weight,
        bestPosition,
        foot,
        currentCity,
        previousClub,
        clubJoined,
        instagramProfileLink,
        twitterProfileLink,
        contractExpired,
      };
    } catch (error) {
      throw error;
    }
  }
};
