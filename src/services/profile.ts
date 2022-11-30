import { UserModel, CoachModel, FootballerModel } from "../models";

interface Props {
  id: string;
  userType: string;
}

export const fetchProfile = async ({ id, userType }: Props) => {
  if (userType === "admin") {
    try {
      return await UserModel.findById(id).select("-password");
    } catch (error) {
      throw error;
    }
  }

  if (userType === "coach") {
    try {
      const coachProfile = await UserModel.findById(id).select("-password");
      const coachModel = await CoachModel.findOne({ profile: id });
      return {
        ...coachProfile,
        ...coachModel,
      };
    } catch (error) {
      throw error;
    }
  }

  if (userType === "footballer") {
    try {
      const footballerProfile = await UserModel.findById(id).select(
        "-password"
      );
      const footballerModel = await FootballerModel.findOne({ profile: id });
      return {
        ...footballerProfile,
        ...footballerModel,
      };
    } catch (error) {
      throw error;
    }
  }
};
