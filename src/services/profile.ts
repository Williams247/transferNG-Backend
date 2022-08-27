import { FootBaller } from "../models";

export const profile = async (id: string, userType: string): Promise<any> => {
  if (userType === "footballer") {
    try {
      return await FootBaller.findOne({ _id: id }).select("-password");
    } catch (error) {
      throw error;
    }
  }
  return;
};
