import express from "express";
import { login, getUserProfile, registerUser } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(registerUser)
router.post('/login', login)
router.route('/').get(protect, getUserProfile)

export default router
