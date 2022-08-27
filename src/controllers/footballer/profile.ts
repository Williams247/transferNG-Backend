import { Request, Response, NextFunction } from 'express'
import { profile } from '../../services/profile'

export const handleGetProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId: string = request.user.id
    const footballerProfile = await profile(userId, 'footballer')
    response.status(200).json({
       message: "Profile fetched",
       result: footballerProfile
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to get user" })
  }
};
