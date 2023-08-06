const express = require('express');
const MachineService = require('../services/machineService');

const router = express.Router();

router.route('/')
    .post(MachineService.createMachine);
router.route('/list/:orgId')
    .get(MachineService.getMachineList);
router.route('/:machineId')
    .get(MachineService.getMachine)
    .put(MachineService.updateMachine)
    .delete(MachineService.deleteMachine);


module.exports = router;
