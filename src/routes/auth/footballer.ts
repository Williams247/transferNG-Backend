import express, { Router } from 'express'
import { handleLoginPlayer } from '../../controllers/auth/login'
import { handleRegisterPlayer } from '../../controllers/auth/register'

const router: Router = express.Router();

router.post('/register', handleRegisterPlayer)
router.post('/login', handleLoginPlayer)

export default router;
