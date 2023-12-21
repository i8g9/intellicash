const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const {editProfile, getUserById, changeImage, checkAuthentication} = require('../controllers/User');
const { multerConfig } = require('../config/Storage');


router.get('/user:id', getUserById);
router.put('/edit/profile', checkAuth, editProfile);
router.put("/user/profile", checkAuth, multerConfig, changeImage);

router.get('/check-auth', checkAuthentication);
module.exports = router;
