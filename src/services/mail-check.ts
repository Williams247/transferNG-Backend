import { CoachModel, FootballerModel } from "../models";

interface VetProp {
  success: boolean;
}

export const mailCheckService = async ({
  email,
}: {
  email: string;
}): Promise<VetProp> => {
  try {
    const checkFootBaller = await FootballerModel.findOne({ email: email });
    const checkCoach = await CoachModel.findOne({ email: email });

    if (checkCoach || checkFootBaller) {
      const response: VetProp = { success: false };
      return response;
    }

    const response: VetProp = { success: true };
    return response;
  } catch (error) {
    throw error;
  }
};
