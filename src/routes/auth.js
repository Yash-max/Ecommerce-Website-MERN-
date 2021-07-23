const express = require('express');
const { signup, signin, requiresignin } = require('../controller/auth');
const router = express.Router();
const User = require('../models/user');
const { validateRequest, isRequestValidated, validateSigninRequest, validateSignupRequest } = require('../validators/auth');

router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/profile', requiresignin, (req, res) => {
    res.status(200).json({
        messsage: 'profile'
    });
});
module.exports = router;