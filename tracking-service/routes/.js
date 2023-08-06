const express = require('express');
const WorkOrderService = require('../services/workOrderService');

const router = express.Router();

router.route('/')
    .post(WorkOrderService.createWorkOrder);
router.route('/list/:userId')
    .get(WorkOrderService.getWorkOrderList);
router.route('/:workOrderId')
    .get(WorkOrderService.getWorkOrderById)
    .put(WorkOrderService.updateWorkOrder)
    .delete(WorkOrderService.deleteWorkOrder);


module.exports = router;
