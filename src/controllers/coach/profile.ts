import { Request, Response, NextFunction } from 'express'
import { profile } from '../../services/profile'

export const handleGetProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId: string = request.user.id
    const coachProfile = await profile(userId, 'coach')
    response.status(200).json({
       message: "Profile fetched",
       result: coachProfile
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: "Failed to get coach profile" })
  }
};
