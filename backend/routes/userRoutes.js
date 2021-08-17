import express from "express";
import {
    login,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser, getUserById, updateUser
} from "../controllers/userController.js";
import {admin, protect} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', login)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router
