const User = require("../model/User");
const RestResponse = require("../util/response.helper");
const bcrypt = require('bcrypt');

const EmployeeService = {
    validateEmployee: (employee) => {
        const result = {
            valid: true,
            message: null
        }
        if(!employee.email) {
            result.valid = false;
            result.message = 'Email id is missing.';
            return result;
        }
        if(!employee.mobilenumber) {
            result.valid = false;
            result.message = 'Mobile number is missing.';
            return result;
        }

        if(!employee.companyId) {
            result.valid = false;
            result.message = 'Organization id is missing.';
            return result;
        }

        if(isNaN(employee.mobilenumber)) {
            result.valid = false;
            result.message = 'Enter valid mobile number.';
            return result;
        }
        return result;
    },
    createEmployee: async (req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = EmployeeService.validateEmployee(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const isUserExist =  await User.findOne({email: payload.email});
                if(isUserExist) {
                    return  res.status(409).send(RestResponse.error('Given Email Id or mobile is already exist.'));
                } else {
                    const user = new User(req.body);
                    user.password = await bcrypt.hash('Welcome1',10);
                    const response = await User.create(user);
                    if(response) {
                        return res.status(200).send(RestResponse.success(response));
                    }    
                }    
            }    
        }
    }, 
    updateEmployee: async (req,res) => {
        const payload = req.body;
        const employeeId = req.params.employeeId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = EmployeeService.validateEmployee(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await User.findOneAndUpdate({id: employeeId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('User not found.'));
                }    
            }
        }
    }, 
    deleteEmployee: async (req,res) => {
        const employeeId = req.params.employeeId;
        if(!employeeId) {
            return res.status(400).send(RestResponse.error('Employee id is missing.'));
        } else {
            const result = await User.findOneAndDelete({id: employeeId});
            if(result) {
                return  res.status(200).send(RestResponse.success('Employee deleted successfully.'));
            } else {
                return  res.status(404).send(RestResponse.error('User not found.'));
            }    
        }
    },
    getEmployee: async (req,res) => {
        const employeeId = req.params.employeeId;
        const queryParam = req.query;
        if(!employeeId) {
            return res.status(400).send(RestResponse.error('Employee id is missing.'));
        } else {
            const result = await User.findOne({id: employeeId,...queryParam});
            if(result) {
                return  res.status(200).send(RestResponse.success(result));
            } else {
                return  res.status(404).send(RestResponse.error('User not found.'));
            }    
        }
    }, 
    getEmployeeList: async (req,res) => {
        const requestContext = req.requestContext;
        const employeeList =  await User.find({
            companyId: requestContext.companyId,
            status: 'ACTIVE',
            "roles.APPADMIN": {$ne : 1},
            'roles.ADMIN':{$ne : 2}
        });
        if(employeeList) {
            return res.status(200).send(RestResponse.success(employeeList));
        } else {
            return res.status(500).send(RestResponse.error('Internal server error.'));            
        }
    }, 
}

module.exports = EmployeeService;