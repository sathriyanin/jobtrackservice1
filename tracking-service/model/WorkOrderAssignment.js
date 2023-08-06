const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const Counter = require('./Counter');

const workOrderAssignmentSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    displayId: String,
    workOrderId: String,
    assignedUserId: String,
    assignedBy: String,
    clientId: String,
    startDate: String,
    endDate: String,
    attachment: [String],
    status: {
        type: String,
        default: "OPEN"
    },
    currentStepId: String,
    currentStepStatus: String,
    steps: [{
        id: String,
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
        assignedDate: String,
        assignedUserId: String
    }]
});
workOrderAssignmentSchema.pre('save', async function(next) {
    // Don't increment if this is NOT a newly created document
    if(!this.isNew) return;

    const result = await Counter.increment('assignment');
    this.displayId = `WO${new Date().getFullYear()}${result}`;
    next();
});
const WorkOrderAssignment = mongoose.model('workorderAssignments',workOrderAssignmentSchema);
module.exports = WorkOrderAssignment;
