import { FootballerModel, CoachModel } from "../models";

export const profile = async (id: string, userType: string): Promise<any> => {
  if (userType === "footballer") {
    try {
      return await FootballerModel.findOne({ _id: id }).select("-password");
    } catch (error) {
      throw error;
    }
  } else if (userType === "coach") {
    try {
      return await CoachModel.findOne({ _id: id }).select("-password");
    } catch (error) {
      throw error;
    }
  }
};
