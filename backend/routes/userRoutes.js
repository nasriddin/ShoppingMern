import express from "express";
import {login, getUserProfile, registerUser, updateUserProfile} from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(registerUser)
router.post('/login', login)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
