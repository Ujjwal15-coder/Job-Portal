import express from 'express'
import { regiseter, login, getAllUsers, updateUser, deleteUser, findUserById, getMe } from '../controllers/studentController.js';
import { verifyToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Public routes
router.post('/register', regiseter)
router.post('/login', login)

// Protected routes
router.get('/me', verifyToken, getMe)
router.get('/getAllUser', verifyToken, getAllUsers)
router.put('/updateUser/:id', verifyToken, updateUser)
router.get('/get/:id', verifyToken, findUserById)

// Admin only
router.delete('/deleteUser/:id', verifyToken, isAdmin, deleteUser)

export default router;