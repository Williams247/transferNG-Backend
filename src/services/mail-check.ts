import { UserModel } from "../models";

interface VetProp {
  success: boolean;
}

export const mailCheckService = async ({
  email,
}: {
  email: string;
}): Promise<VetProp> => {
  try {
    const isRegistered = await UserModel.findOne({ email });
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
