const {validationResult, check} = require('express-validator');
exports.validateSignupRequest = [
    
    check('firstname')
    .notEmpty()
    .withMessage('First Name is required'),

    check('lastname')
    .notEmpty()
    .withMessage('Last Name is required'),

    check('email')
    .isEmail()
    .withMessage('Enter a valid email'),

    check('password')
    .isLength({min: 6})
    .withMessage('Enter a password of minimum 6')
];
exports.validateSigninRequest = [
    
    check('email')
    .isEmail()
    .withMessage('Enter a valid email'),

    check('password')
    .isLength({min: 6})
    .withMessage('Enter a password of minimum 6')
];
exports.isRequestValidated = (req, res, next) => {
    const input = validationResult(req);
    if(input.array().length > 0) {
        return res.status(400).json({error: input.array()});
    } 
    next();
}