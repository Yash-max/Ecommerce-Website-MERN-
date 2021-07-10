const express = require('express');
const { signup, signin, requiresignin } = require('../controller/auth');
const router = express.Router();
const User = require('../models/user');
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/profile', requiresignin, (req, res) => {
    res.status(200).json({
        messsage: 'profile'
    });
});
module.exports = router;