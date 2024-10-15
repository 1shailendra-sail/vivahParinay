const express = require('express');
const { signup, login, verifyOtp, getProfile, updateProfile } = require('../controllers/authController');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.get('/profile', isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
// Admin routes
router.get('/admin/users', isAuthenticated, isAdmin, getAllUsers);
router.delete('/admin/users/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;
