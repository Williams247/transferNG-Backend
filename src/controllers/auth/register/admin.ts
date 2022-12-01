import { Request, Response } from "express";
import bycript from "bcryptjs";
import { UserModel } from "../../../models";
import { ValidateAdminReg } from "../../../utils";

export const handleRegisterAdmin = async (
  request: Request,
  response: Response
) => {
  try {
    const { body } = request;
    const validateAdminRegistration = ValidateAdminReg(body);

    if (validateAdminRegistration.error) {
      response
        .status(400)
        .json({ error: validateAdminRegistration.error.message });
      return;
    }

    const admin = await UserModel.find();
    if (admin.filter((i) => i.role === "admin").length > 0) {
      response.status(409).json({
        error: "Can not have more than one account for an admin",
      });
      return;
    }

    const hashedPassword = await bycript.hash(body.password, 10);

    const createAdmin = new UserModel({
      ...body,
      password: hashedPassword,
      role: "admin",
    });

    await createAdmin.save();
    response.status(201).json({ message: "Congratulations, account created" });
  } catch (error) {
    response.status(500).json({ error: "Sorry, registration process failed" });
  }
};
