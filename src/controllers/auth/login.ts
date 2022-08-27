import { Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import { vetLoginService } from '../../services'
import { ValidateFooballerLogin } from '../../validations/auth'

interface PayloadProps {
  id: string,
  firstname: string,
  surname: string,
  email: string
}

export const handleLoginPlayer = async (request: Request, response: Response): Promise<void> => {
  try {

    const { body } = request
    const validateFootallerLogin = ValidateFooballerLogin(body)

    if (validateFootallerLogin.error) {
      response.status(400).json({ error: validateFootallerLogin.error.message })
      return
    }

    const dataResponse: any = await vetLoginService({
      email: body.email,
      password: body.password,
      userType: 'footballer'
    })

    const { isSuccess, error, status, data, messageResponse } = dataResponse
    if (!isSuccess) {
      response.status(status).json({ error: error })
      return
    }

    const payload: PayloadProps = {
      id: data._id,
      firstname: data.firstname,
      surname: data.surname,
      email: data.email
    }

    const token: string = await JWT.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 3600 * 24 * 7 })
    response.status(status).json({
      message: messageResponse,
      result: {
        userData: payload,
        token: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to login" })
  }
}
