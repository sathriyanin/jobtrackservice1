const Customer = require("../model/Customer");
const User = require("../model/User");
const WorkOrder = require("../model/WorkOrder");
const WorkOrderAssignment = require("../model/WorkOrderAssignment");
const RestResponse = require("../util/response.helper");

const WorkOrderService = {
    validateWorkOrder: (workOrder) => {
        const result = {
            valid: true,
            message: null
        }
        if(!workOrder.name) {
            result.valid = false;
            result.message = 'Name is missing.';
            return result;
        }
        return result;
    },
    validateWorkOrderAssignment: (assignment) => {
        const result = {
            valid: true,
            message: null
        }
        if(!assignment.workOrderId) {
            result.valid = false;
            result.message = 'Work order id is missing.';
            return result;
        }
        if(!assignment.clientId) {
            result.valid = false;
            result.message = 'Customer id is missing.';
            return result;
        }

        return result;
    },
    validateWorkOrderAssignmentStep: (step) => {
        const result = {
            valid: true,
            message: null
        }
        if(!step.id) {
            result.valid = false;
            result.message = 'Step id is missing.';
            return result;
        }
        return result;
    },
    createWorkOrder: async (req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = WorkOrderService.validateWorkOrder(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const workOrder = new WorkOrder(req.body);
                workOrder.createdBy = req.requestContext.id;
                workOrder.createdOn = new Date().toISOString();
                workOrder.steps = workOrder.steps.map((step,index) => {
                    step.position = index+1;
                    step.assignedDate = new Date().toISOString();
                    return step;
                })
                const response = await WorkOrder.create(workOrder);
                if(response) {
                    return res.status(200).send(RestResponse.success(response));
                }    
            }    
        }
    },
    updateWorkOrder: async (req,res) => {
        const payload = req.body;
        const workOrderId = req.params.workOrderId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = WorkOrderService.validateWorkOrder(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await WorkOrder.findOneAndUpdate({id: workOrderId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('Work order not found.'));
                }    
            }
        }
    },
    deleteWorkOrder: async (req,res) => {
        const workOrderId = req.params.workOrderId;
        if(!workOrderId) {
            return res.status(400).send(RestResponse.error('Work order id is missing.'));
        } else {
            console.log(workOrderId)
            const result = await WorkOrder.findOneAndDelete({id: workOrderId});
            if(result) {
                return  res.status(200).send(RestResponse.success('Work order deleted successfully.'));
            } else {
                return  res.status(404).send(RestResponse.error('Work order not found.'));
            }    
        }
    },
    getWorkOrderById: async(req,res) => {
        const workOrderId = req.params.workOrderId;
        if(!workOrderId) {
            return res.status(400).send(RestResponse.error('Work order id is missing.'));
        } else {
            const result = await WorkOrder.findOne({id: workOrderId});
            if(result) {
                return  res.status(200).send(RestResponse.success(result));
            } else {
                return  res.status(404).send(RestResponse.error('Work order not found.'));
            }    
        }
    },
    getWorkOrderList: async(req,res) => {
        const userId = req.params.userId;
        const statusParam = req.query.status;
        if(userId) {
            const payload = {createdBy: userId };
            if(statusParam) {
                payload.status = statusParam;
            }
            const response = await WorkOrder.find(payload);
            if(response) {
                return res.status(200).send(RestResponse.success(response));
            }    
        } else {
            return res.status(400).send(RestResponse.error('User id is missing.'));
        }
    },
    createAssignment: async(req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = WorkOrderService.validateWorkOrderAssignment(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const workOrderAssignment = new WorkOrderAssignment(req.body);
                const workOrder = await WorkOrder.findOne(({id : workOrderAssignment.workOrderId}))
                workOrderAssignment.assignedBy = req.requestContext.id;
                workOrderAssignment.currentStepStatus = 'NOT_STARTED';
                workOrderAssignment.currentStepId = workOrder.steps.find(item => item.position === 1).id;
                const response = await WorkOrderAssignment.create(workOrderAssignment);
                if(response) {
                    return res.status(200).send(RestResponse.success(response));
                }    
            }    
        }
    },
    updateAssignment: async (req,res) => {
        const payload = req.body;
        const workOrderId = req.params.workOrderId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = WorkOrderService.validateWorkOrderAssignment(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await WorkOrderAssignment.findOneAndUpdate({id: workOrderId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('Work order assignment not found.'));
                }    
            }
        }
    },
    getAssignmentListByAssignId: async(req,res) => {
        const userId = req.params.userId;
        const statusParam = req.query.status;
        if(userId) {
            const payload = {'steps.assignedUserId': userId };
            if(statusParam) {
                payload.status = statusParam;
            }
            const response = await WorkOrderAssignment.find(payload);
            if(response) {
                const workOrderIds = response.map(item => item.workOrderId);
                const assignedByIds = response.map(item => item.assignedBy);
                const clientIds = response.map(item => item.clientId);

                const workOrders = await WorkOrder.find({id: {$in: workOrderIds }});
                const users = await User.find({id: {$in: assignedByIds }});
                const clients = await Customer.find({id: {$in: clientIds }});
                const finalResponse = response.map(assignment => {
                    const obj = assignment.toObject();
                    clients.forEach(item => {
                        if(item.id === assignment.clientId) {
                            obj.clientName = item.name;
                        }
                    });

                    users.forEach(item => {
                        if(item.id === assignment.assignedBy) {
                            obj.assignedByUserName = (item.firstname) ? `${item.firstname} ${item.lastname }` : 'NA';
                        }
                    });

                    workOrders.forEach(order => {
                        if(order.id === assignment.workOrderId) {
                            obj.name = order.name;
                        }
                    })
                    return obj;
                })
                return res.status(200).send(RestResponse.success(finalResponse));
            }    
        } else {
            return res.status(400).send(RestResponse.error('User id is missing.'));
        }
    },
    getAssignmentListByAssignBy: async(req,res) => {
        const userId = req.params.userId;
        const statusParam = req.query.status;
        if(userId) {
            const payload = {assignedBy: userId };
            if(statusParam) {
                payload.status = statusParam;
            }
            const response = await WorkOrderAssignment.find(payload);
            if(response) {
                const workOrderIds = response.map(item => item.workOrderId);
                const workOrders = await WorkOrder.find({id: {$in: workOrderIds }});
                const finalResponse = response.map(assignment => {
                    const obj = assignment.toObject();
                    workOrders.forEach(order => {
                        if(order.id === assignment.workOrderId) {
                            obj.name = order.name;
                        }
                    })
                    return obj;
                })
                return res.status(200).send(RestResponse.success(finalResponse));
            }    
        } else {
            return res.status(400).send(RestResponse.error('User id is missing.'));
        }
    },
    getAssignmentListByClientId: async(req,res) => {
        const clientId = req.params.clientId;
        if(clientId) {
            const payload = {clientId };
            const response = await WorkOrderAssignment.find(payload);
            if(response) {
                const workOrderIds = response.map(item => item.workOrderId);
                const workOrders = await WorkOrder.find({id: {$in: workOrderIds }});
                const finalResponse = response.map(assignment => {
                    const obj = assignment.toObject();
                    workOrders.forEach(order => {
                        if(order.id === assignment.workOrderId) {
                            obj.name = order.name;
                        }
                    })
                    return obj;
                })
                return res.status(200).send(RestResponse.success(finalResponse));
            }    
        } else {
            return res.status(400).send(RestResponse.error('Client id is missing.'));
        }
    },
    updateAssignmentStep: async (req,res) => {
        const payload = req.body;
        const {workOrderId,stepId} = req.params;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = WorkOrderService.validateWorkOrderAssignmentStep(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await WorkOrderAssignment.findOne({id: workOrderId});
                result.steps = result.steps.map((step,index) => {
                    if(step.id === stepId) {             
                        if(payload.status === 'COMPLETE') {
                            payload.endDate = new Date().toISOString();
                            if(index < result.steps.length) {
                                const nextStep = result.steps[index+1];
                                if(nextStep) {
                                    result.currentStepId = nextStep.id;
                                    result.currentStepStatus = nextStep.status;                            
                                } else {
                                    result.status = 'COMPLETE';
                                    result.endDate = new Date().toISOString();
                                }
                            }
                        } else if(payload.status === 'IN_PROGRESS' && step.status === 'OPEN') {
                            payload.startDate = new Date().toISOString();
                        }
                        step = payload;
                        result.currentStepStatus = payload.status;
                    }
                    return step;
                })
                const finalResult = await WorkOrderAssignment.updateOne({id: workOrderId},result);
                if(finalResult) {
                    return  res.status(200).send(RestResponse.success(result));
                } else {
                    return  res.status(404).send(RestResponse.error('Work order assignment not found.'));
                }    
            }
        }
    },
}
module.exports = WorkOrderService;