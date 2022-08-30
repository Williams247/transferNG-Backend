import { Request, Response } from 'express'
import bycript from 'bcryptjs'
import { FootBaller, Coach } from '../../models'
import vetRegistrationService from '../../services/mail-check'
import { validateFootballerReg, validateCoachReg } from '../../validations/auth'
const cloudinary = require('../../utils/cloudinary')

interface UrlProp {
  public_id: string,
  secure_url: string
}

// Register a footballer
export const handleRegisterPlayer = async (request: Request, response: Response): Promise<void> => {
  try {
    const { body } = request
    const validateFootallerRegistration = validateFootballerReg(body)

    if (validateFootallerRegistration.error) {
      response.status(400).json({ error: validateFootallerRegistration.error.message })
      return
    }

    const vetResponse = await vetRegistrationService({ email: body.email })
    if (!vetResponse.success) {
      response.status(409).json({ error: 'Email taken' })
      return
    }

    const hashPassword: string = await bycript.hash(body.password, 10);
    const createFootballer = new FootBaller({
      ...body,
      role: 'footballer',
      password: hashPassword
    })

    await createFootballer.save()
    response.status(201).json({ message: "Footballer registered" })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to register footaballer" })
  }
}

// Register coach
export const handleRegisterCoach = async (request: Request, response: Response): Promise<void> => {
  try {
    const { body } = request

    const validateCoachRegistration = validateCoachReg(body)
    if (validateCoachRegistration.error) {
      response.status(400).json({ error: validateCoachRegistration.error.message })
      return
    }

    const vetResponse = await vetRegistrationService({ email: body.email })
    if (!vetResponse.success) {
      response.status(409).json({ error: 'Email taken' })
      return
    }

    if (request.files?.length !== 3) {
      response.status(400).json({ error: 'Files for this registration is not complete' })
      return
    }

    const urls: UrlProp[] = []
    const files: any = request.files
    for (const file of files) {
      const { path } = file
      const newPath = await cloudinary.uploader.upload(path)
      urls.push(newPath)
    }

    const hashPassword: string = await bycript.hash(body.password, 10);

    const registerCoach = new Coach({
      ...body,
      password: hashPassword,
      role: 'coach',
      licensesCertificate: {
        public_id: urls[0].public_id,
        secure_url: urls[0].secure_url
      },
      dipolmaCertificate: {
        public_id: urls[1].public_id,
        secure_url: urls[1].secure_url
      },
      otherTrainingCertifications: {
        public_id: urls[2].public_id,
        secure_url: urls[2].secure_url
      }
    })

    await registerCoach.save()

    response.status(201).json({
      message: "Coach Registered",
      data: urls
    })

  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to upload file" })
  }
}
