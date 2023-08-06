const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Counter = require('./Counter');

const userSchema = mongoose.Schema({
    id: {
        type: String, 
        default: uuidv4,
        unique: true
    },
    username: String,
    firstname: String,
    lastname: String,
    mobilenumber: String,
    email: String,
    userId: {
        type: Number,
        unique: true
    },
    password: String,
    companyId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    roles: {
        APPADMIN: Number,
        ADMIN: Number,
        CUSTOMER: Number,
        USER: {
            type: Number,
            default: 3
        }
    }
});
userSchema.pre('save', async function(next) {
    // Don't increment if this is NOT a newly created document
    if(!this.isNew) return;

    const result = await Counter.increment('users');
    this.userId = result;
    next();
});
const User = mongoose.model('users',userSchema);
module.exports = User;
