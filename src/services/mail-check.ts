import { FootBaller, Coach } from "../models"

interface VetProp { success: boolean }

const mailCheckService = async ({ email }: { email: string }): Promise<VetProp> => {
  try {
    const checkFootBaller = await FootBaller.findOne({ email: email })
    const checkCoach = await Coach.findOne({ email: email })

    if (checkCoach || checkFootBaller) {
      const response: VetProp = { success: false }
      return response
    }

    const response: VetProp = { success: true }
    return response
  } catch (error) {
    throw error
  }
}

export default mailCheckService;
