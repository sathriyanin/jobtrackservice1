const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const workOrderSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: String,
    createdBy: String,
    createdOn: String,
    steps: [{
        id: {
            type: String,
            default: uuidv4
        },
        position: Number,
        name: String,
        startDate: String,
        endDate: String,
        status: {
            type: String,
            default: "OPEN"
        },
        machineId: String,
        userId: String,
        remarks: String,
        assignedDate: String
    }],
    status: {
        type: String,
        default: "OPEN"
    }
});

const WorkOrder = mongoose.model('workorders',workOrderSchema);
module.exports = WorkOrder;
