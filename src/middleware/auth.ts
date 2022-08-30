import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

// Auth middleware for students
export const AuthFootballer = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let token = request.headers["authorization"];
    if (!token) {
       response.status(401).json({ error: "Unauthorized" });
       return
    }
    if (!token.startsWith('Bearer ')) {
        response.status(401).json({ error: "Token must have a bearer prefix" });
        return
    }

    token = token.slice(7, token.length);
    const authorized: any = await JWT.verify(token, process.env.SECRET as string);
    
    if (authorized.role !== "footballer") {
      return response.status(401).json({ error: "Unauthorized" })
    }

    request.user = authorized;
    next();
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: error })
  }
};

export const AuthCoach = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let token = request.headers["authorization"];
    if (!token) {
       response.status(401).json({ error: "Unauthorized" });
       return
    }
    if (!token.startsWith('Bearer ')) {
        response.status(401).json({ error: "Token must have a bearer prefix" });
        return
    }
    
    token = token.slice(7, token.length);
    const authorized: any = await JWT.verify(token, process.env.SECRET as string);
    
    if (authorized.role !== "coach") {
      response.status(401).json({ error: "Unauthorized" })
      return
    }

    request.user = authorized;
    next();
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: error })
  }
};
