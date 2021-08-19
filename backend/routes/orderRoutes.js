import express from "express";
import {admin, protect} from '../middleware/authMiddleware.js'
import {
    addOrderItems,
    getOrderById,
    getOrders,
    getUserOrders, updateOrderToDelivered,
    updateOrderToPay
} from "../controllers/orderController.js";

const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPay)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router
