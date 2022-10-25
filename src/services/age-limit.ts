import { AgeRange, ResponseProps } from "../utils/types";

export const handleVetAgeRange = async ({
  min,
  max,
  dob,
  user,
}: AgeRange): Promise<ResponseProps | boolean> => {
  const dateOfBirth: number = new Date(dob).getFullYear();
  const currentDate: number = new Date().getFullYear();
  const age = currentDate - dateOfBirth;
  if (age < min)
    return {
      message: `A ${user} age should not be less than ${min}`,
      status: 400,
    };
  if (age > max)
    return {
      message: `A ${user} age should not be greater then ${max}`,
      status: 400,
    };
  return true;
};
