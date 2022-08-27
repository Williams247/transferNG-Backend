import express, { Router } from 'express'
const upload = require('../../utils/multer')
import { handleRegisterCoach } from '../../controllers/auth/register'

const router: Router = express.Router();

router.post('/register', upload.array('image', 4), handleRegisterCoach)
// router.post('/login', handleLoginPlayer)

export default router;
