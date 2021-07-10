const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        trim: true,
        index: true,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true 
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    phone_number: {
        type: String
    },
    profile_picture: {
        type: String
    }
},{timeStamps: true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});
userSchema.virtual('fullname')
.get(function(){
    return `${this.firstname} ${this.lastname}`;
});
userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('user', userSchema);