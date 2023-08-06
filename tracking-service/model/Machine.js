const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const machineSchema = new Schema({
    id: {
        type: String,
        default: uuidv4
    },
    name: String,
    model: String,
    orgId: String,
    status: {
        type: String,
        default: "ACTIVE"
    }
});

const Machine = mongoose.model('machines',machineSchema);
module.exports = Machine;
