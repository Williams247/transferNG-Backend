import express, { Router } from 'express'
import { handleGetProfile } from '../controllers/footballer/profile'
import { AuthFootballer } from '../middleware/auth'

const router: Router = express.Router();

router.get('/profile', AuthFootballer, handleGetProfile)

export default router;
