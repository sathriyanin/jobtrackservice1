const express = require('express');
const EmployeeService = require('../services/employeeService');

const router = express.Router();

router.route("/")
    .get(EmployeeService.getEmployeeList)
    .post(EmployeeService.createEmployee)
router.route("/:employeeId")
    .get(EmployeeService.getEmployee)
    .put(EmployeeService.updateEmployee)
    .delete(EmployeeService.deleteEmployee);

module.exports = router;