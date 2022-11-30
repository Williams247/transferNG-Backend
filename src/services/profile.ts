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
      const coach = (await UserModel.findById(id).select("-password").populate({
        path: "coachProfile",
        select: "-password",
      })) as UserSchemaProps;

      return {
        _id: coach._id,
        firstname: coach.firstname,
        surname: coach.surname,
        email: coach.email,
        phoneNumber: coach.phoneNumber,
        role: coach.role,
        licenses: coach.coachProfile?.licenses,
        dipolma: coach.coachProfile?.dipolma,
        otherTraining: coach.coachProfile?.otherTraining,
        dob: coach.coachProfile?.dob,
        nationality: coach.coachProfile?.nationality,
        language: coach.coachProfile?.language,
        formerTeam: coach.coachProfile?.formerTeam,
        currentTeam: coach.coachProfile?.currentTeam,
        currentCity: coach.coachProfile?.currentCity,
      };
    } catch (error) {
      throw error;
    }
  }

  if (userType === "footballer") {
    try {
      const footballer = (await UserModel.findById(id)
        .select("-password")
        .populate({
          path: "footballerProfile",
          select: "-password",
        })) as UserSchemaProps;

      return {
        _id: footballer._id,
        firstname: footballer.firstname,
        surname: footballer.surname,
        email: footballer.email,
        phoneNumber: footballer.phoneNumber,
        role: footballer.role,
        dob: footballer.footballerProfile?.dob,
        nationality: footballer.footballerProfile?.nationality,
        language: footballer.footballerProfile?.language,
        height: footballer.footballerProfile?.height,
        weight: footballer.footballerProfile?.weight,
        bestPosition: footballer.footballerProfile?.bestPosition,
        foot: footballer.footballerProfile?.foot,
        currentCity: footballer.footballerProfile?.currentCity,
        linkedinProfileLink: footballer.footballerProfile?.linkedinProfileLink,
        instagramProfileLink:
          footballer.footballerProfile?.instagramProfileLink,
        twitterProfileLink: footballer.footballerProfile?.twitterProfileLink,
        previousClub: footballer.footballerProfile?.previousClub,
        clubJoined: footballer.footballerProfile?.clubJoined,
        contractExpired: footballer.footballerProfile?.contractExpired,
      };
    } catch (error) {
      throw error;
    }
  }
};
