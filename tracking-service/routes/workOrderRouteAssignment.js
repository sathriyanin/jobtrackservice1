const express = require('express');
const WorkOrderService = require('../services/workOrderService');

const router = express.Router();

router.route('/')
    .post(WorkOrderService.createAssignment);
router.route('/:workOrderId/step/:stepId')
    .put(WorkOrderService.updateAssignmentStep);
router.route('/:workOrderId')
    .put(WorkOrderService.updateAssignment);
router.route('/employee/:userId')
    .get(WorkOrderService.getAssignmentListByAssignId);
router.route('/client/:clientId')
    .get(WorkOrderService.getAssignmentListByClientId);
router.route('/:userId')
    .get(WorkOrderService.getAssignmentListByAssignBy);


module.exports = router;
