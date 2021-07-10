const User = require('../../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) {
            return res.status(400).json({
                message: 'User Already Exists'
            });
        }
        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;
        const _user = new User({
            firstname,
            lastname,
            email,
            password,
            username: Math.random().toString(),
            role: 'admin'
        });
        _user.save((error, data) => {
            if(error) {
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }
            if(data) {
                return res.status(400).json({
                    message: 'User Created Successfully'
                });
            }
        })
    });
}
exports.signin  = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
                const {
                    firstname,
                    lastname,
                    email,
                    role,
                    fullname
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        firstname,
                        lastname,
                        email,
                        role,
                        fullname
                    }
                });
            } else {
                return res.status(400).json({
                    message: 'Wrong Credentials'
                });
            }
        } else {
            return res.status(400).json({
                message: 'User Does Not Exist'
            });
        }
    });
}

exports.requiresignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    user = jwt.decode(token, process.env.SECRET_KEY);
    req.user = user;
    next();
}