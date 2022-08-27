import fs from 'fs'
import { Request, Response } from 'express'
import bycript from 'bcryptjs'
import { FootBaller } from '../../models'
import { validateFootballerReg } from '../../validations/auth'
const cloudinary = require('../../utils/cloudinary')

// Register a footballer
export const handleRegisterPlayer = async (request: Request, response: Response): Promise<void> => {
  try {
    const { body } = request
    const validateFootallerRegistration = validateFootballerReg(body)

    if (validateFootallerRegistration.error) {
      response.status(400).json({ error: validateFootallerRegistration.error.message })
      return
    }

    const doesFootBallerExist = await FootBaller.findOne({ email: body.email });
    if (doesFootBallerExist) {
      response.status(409).json({ error: "Email taken" })
      return
    }

    const hashPassword: string = await bycript.hash(body.password, 10);
    const createFootballer = new FootBaller({
      ...body,
      password: hashPassword
    })

    await createFootballer.save()
    response.status(201).json({ message: "Footballer registered" })
  } catch (error) {
    response.status(500).json({ error: "Failed to register footaballer" })
  }
}


export const handleRegisterCoach = async (request: Request, response: Response): Promise<void> => {
  try {
    const urls = []
    const files: any = request.files
    for (const file of files) {
      const { path } = file
      const newPath = await cloudinary.uploader.upload(path)
      urls.push(newPath)
    }

    response.status(201).json({
      message: "Files uploaded",
      data: urls
    })

    // @ts-ignore
    // console.log(request.file?.path)
    // await cloudinary.uploader.upload(request.file?.path)
    // response.status(201).json({ message: "File uploaded" })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to upload file" })
  }
}
