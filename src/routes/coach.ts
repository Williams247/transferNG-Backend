import express, { Router } from 'express'
import { handleGetProfile } from '../controllers/coach/profile'
import { AuthCoach } from '../middleware/auth'

const router: Router = express.Router();

router.get('/profile', AuthCoach, handleGetProfile)

export default router;
