const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const customerSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: String,
    password: String,
    orgId: {
        type: String,
        required: true
    },
    mobilenumber: String,
    email: String,
    status: {
        type: String,
        default: "ACTIVE"
    }
});

const Customer = mongoose.model('customers',customerSchema);
module.exports = Customer;
