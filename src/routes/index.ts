import express, { Application } from 'express'
import authCoach from './auth/coach'
import authFootballer from './auth/footballer'
import footballerProfile from './footballer/profile'

const appRouter: Application = express()

// Auth routes
appRouter.use('/auth/footballer', authFootballer)
appRouter.use('/auth/coach', authCoach)

appRouter.use('/footballer', footballerProfile)

export default appRouter;
