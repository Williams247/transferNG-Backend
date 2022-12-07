import { UserModel } from "../models";

interface VetProp {
  success: boolean;
}

export const phoneNumberCheckService = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  try {
    const isRegistered = await UserModel.findOne({ phoneNumber });
    if (isRegistered) {
      const response: VetProp = { success: false };
      return response;
    }

    const response: VetProp = { success: true };
    return response;
  } catch (error) {
    throw error;
  }
};
