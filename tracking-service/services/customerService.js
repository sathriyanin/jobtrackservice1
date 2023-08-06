const Customer = require("../model/Customer");
const RestResponse = require("../util/response.helper");
const bcrypt = require('bcrypt');

const CustomerService = {
    validateCustomer: (customer) => {
        const result = {
            valid: true,
            message: null
        }
        if(!customer.email) {
            result.valid = false;
            result.message = 'Email id is missing.';
            return result;
        }
        if(!customer.mobilenumber) {
            result.valid = false;
            result.message = 'Mobile number is missing.';
            return result;
        }
        if(!customer.orgId) {
            result.valid = false;
            result.message = 'Organization id is missing.';
            return result;
        }
        if(isNaN(customer.mobilenumber)) {
            result.valid = false;
            result.message = 'Enter valid mobile number.';
            return result;
        }
        return result;
    },
    createCustomer: async (req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = CustomerService.validateCustomer(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const isCustomerExist =  await Customer.findOne({email: payload.email});
                if(isCustomerExist) {
                    return  res.status(409).send(RestResponse.error('Given customer already exist.'));
                } else {
                    const customer = new Customer(req.body);
                    customer.password = await bcrypt.hash('Welcome1',10);
                    const response = await Customer.create(customer);
                    if(response) {
                        return res.status(200).send(RestResponse.success(response));
                    }    
                }    
            }    
        }
    }, 
    updateCustomer: async (req,res) => {
        const payload = req.body;
        const customerId = req.params.customerId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = CustomerService.validateCustomer(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await Customer.findOneAndUpdate({id: customerId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('Customer not found.'));
                }    
            }
        }
    }, 
    deleteCustomer: async (req,res) => {
        const customerId = req.params.customerId;
        if(!customerId) {
            return res.status(400).send(RestResponse.error('Customer id is missing.'));
        } else {
            const result = await Customer.findByIdAndDelete({id: customerId});
            if(result) {
                return  res.status(200).send(RestResponse.success('Customer deleted successfully.'));
            } else {
                return  res.status(404).send(RestResponse.error('Customer not found.'));
            }    
        }
    },
    getCustomer: async (req,res) => {
        const customerId = req.params.customerId;
        if(!customerId) {
            return res.status(400).send(RestResponse.error('Customer id is missing.'));
        } else {
            const result = await Customer.findOne({id: customerId});
            if(result) {
                return  res.status(200).send(RestResponse.success(result));
            } else {
                return  res.status(404).send(RestResponse.error('Customer not found.'));
            }    
        }
    }, 
    getCustomerList: async (req,res) => {
        const requestContext = req.requestContext;
        const customerList =  await Customer.find({
            orgId: requestContext.companyId,
            status: 'ACTIVE'
        });
        if(customerList) {
            return res.status(200).send(RestResponse.success(customerList));
        } else {
            return res.status(500).send(RestResponse.error('Internal server error.'));            
        }
    }, 
}

module.exports = CustomerService;