const express = require('express');
const CustomerService = require('../services/customerService');

const router = express.Router();

router.route("/")
    .get(CustomerService.getCustomerList)
    .post(CustomerService.createCustomer)
router.route("/:customerId")
    .get(CustomerService.getCustomer)
    .put(CustomerService.updateCustomer)
    .delete(CustomerService.deleteCustomer);

module.exports = router;