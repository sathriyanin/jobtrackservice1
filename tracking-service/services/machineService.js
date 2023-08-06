const Machine = require("../model/Machine");
const RestResponse = require("../util/response.helper");

const MachineService = {
    validateMachine: (machine) => {
        const result = {
            valid: true,
            message: null
        }
        if(!machine.name) {
            result.valid = false;
            result.message = 'Name is missing.';
            return result;
        }

        if(!machine.model) {
            result.valid = false;
            result.message = 'Model is missing.';
            return result;
        }
        return result;
    },
    createMachine: async (req,res) => {
        const payload = req.body;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = MachineService.validateMachine(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const modelObj = new Machine(payload);
                const result = await Machine.create(modelObj);
                if(result) {
                    return res.status(200).send(RestResponse.success(result));
                }
            }
        }
    },
    updateMachine: async (req,res) => {
        const payload = req.body;
        const machineId = req.params.machineId;
        if(!payload) {
            return res.status(400).send(RestResponse.error('Incorrect payload.'));
        } else {
            const validation = MachineService.validateMachine(payload);
            if(!validation.valid) {
                return res.status(400).send(RestResponse.error(validation.message));
            } else {
                const result = await Machine.findOneAndUpdate({id: machineId},payload);
                if(result) {
                    return  res.status(200).send(RestResponse.success(payload));
                } else {
                    return  res.status(404).send(RestResponse.error('Machine not found.'));
                }    
            }
        }
    }, 
    deleteMachine: async (req,res) => {
        const machineId = req.params.machineId;
        if(!machineId) {
            return res.status(400).send(RestResponse.error('Machine id is missing.'));
        } else {
            const result = await Machine.findOneAndDelete({id: machineId});
            if(result) {
                return  res.status(200).send(RestResponse.success("Machine deleted successfully."));
            } else {
                return  res.status(404).send(RestResponse.error('Machine not found.'));
            }    
        }
    },
    getMachine: async (req,res) => {
        const machineId = req.params.machineId;
        if(!machineId) {
            return res.status(400).send(RestResponse.error('Machine id is missing.'));
        } else {
            const result = await Machine.findOne({id: machineId});
            if(result) {
                return  res.status(200).send(RestResponse.success(result));
            } else {
                return  res.status(404).send(RestResponse.error('Machine not found.'));
            }    
        }
    },
    getMachineList: async (req,res) => {
        const orgId = req.params.orgId;
        if(orgId) {
            const response = await Machine.find({status: "ACTIVE",orgId });
            if(response) {
                return res.status(200).send(RestResponse.success(response));
            }    
        } else {
            return res.status(400).send(RestResponse.error('Org id is missing.'));
        }
    }
}
module.exports = MachineService;