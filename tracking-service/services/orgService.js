const Organization = require("../model/Organization");
const RestResponse = require("../util/response.helper");

const OrgService = {
    validateOrg: (org) => {
        const result = {
            valid: true,
            message: null
        }
        if(!org.email) {
            result.valid = false;
            result.message = 'Email id is missing.';
            return result;
        }
        if(!org.mobilenumber) {
            result.valid = false;
            result.message = 'Mobile number is missing.';
            return result;
        }

        if(!org.name) {
            result.valid = false;
            result.message = 'Name is missing.';
            return result;
        }

        if(isNaN(org.mobilenumber)) {
            result.valid = false;
            result.message = 'Enter valid mobile number.';
            return result;
        }
        return result;
    },

    createOrg: async (req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = OrgService.validateOrg(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const orgObj = new Organization(payload);
                const result = await Organization.create(orgObj);
                if(result) {
                    return res.status(200).send(RestResponse.success(result));
                }
            }
        }
    },
    updateOrg: async (req,res) => {
        const payload = req.body;
        const orgId = req.params.orgId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = OrgService.validateOrg(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await Organization.findOneAndUpdate({id: orgId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('Organization not found.'));
                }    
            }
        }
    }, 
    deleteOrg: async (req,res) => {
        const orgId = req.params.orgId;
        if(!orgId) {
            return res.status(400).send(RestResponse.error('Organization id is missing.'));
        } else {
            const result = await Organization.findOneAndDelete({id: orgId});
            if(result) {
                return  res.status(200).send(RestResponse.success('Organization deleted successfully.'));
            } else {
                return  res.status(404).send(RestResponse.error('Organization not found.'));
            }    
        }
    },
    getOrg: async (req,res) => {
        const orgId = req.params.orgId;
        if(!orgId) {
            return res.status(400).send(RestResponse.error('Organization id is missing.'));
        } else {
            const result = await Organization.findOne({id: orgId});
            if(result) {
                return  res.status(200).send(RestResponse.success(result));
            } else {
                return  res.status(404).send(RestResponse.error('Organization not found.'));
            }    
        }
    }, 
    getOrgList: async (req,res) => {
        const response = await Organization.find({status: "ACTIVE"});
        if(response) {
            return res.status(200).send(RestResponse.success(response));
        }
    }
}

module.exports = OrgService;