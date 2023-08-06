const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const organizationSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: String,
    email: String,
    mobile: String,
    status: {
        type: String,
        default: "ACTIVE"
    }
});
const Organization = mongoose.model('organization',organizationSchema); 
module.exports = Organization;