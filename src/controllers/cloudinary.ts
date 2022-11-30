import { Request, Response } from "express";
import { cloudinaryUpload } from "../utils";

export const handleUpload = async (request: Request, response: Response) => {
  const { file } = request;
  try {
    if (!file) {
      response.status(400).json({ error: "A file is required for upload" });
      return;
    }

    const serverResponse = await cloudinaryUpload.uploader.upload(file?.path);

    return response.status(200).json({
      message: "File uploaded",
      public_id: serverResponse.public_id,
      imageUrl: serverResponse.url,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to upload file" });
  }
};

export const handleDelete = async (request: Request, response: Response) => {
  try {
    const {
      query: { id },
    } = request;

    if (!id) {
      response.status(401).json({ error: "File id is required" });
    }

    const res = await cloudinaryUpload.uploader.destroy(id);

    if (res.result === "not found") {
      response.status(404).json({ error: "File id not found" });
      return;
    }

    return response.status(200).json({
      message: "File deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
