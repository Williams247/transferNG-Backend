import express, { Application } from 'express'
import authCoach from './auth/coach'
import authFootballer from './auth/footballer'
import footballer from './footballer'
import coach from './coach'

const appRouter: Application = express()

// Auth routes
appRouter.use('/auth/footballer', authFootballer)
appRouter.use('/auth/coach', authCoach)

appRouter.use('/footballer', footballer)
appRouter.use('/coach', coach)

export default appRouter;
