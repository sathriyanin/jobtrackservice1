const User = require("../model/User");
const RestResponse = require("../util/response.helper");

const UserService = {
    getUserById: async (req,res) => {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).send(RestResponse.error("User id is missing."));
        }

        const userObj = await User.findOne({id: userId});
        if(userObj) {
            return res.status(200).send(RestResponse.success(userObj));
        } else {
            return res.status(404).send(RestResponse.error('User not found.'));
        }
    },
    deleteUser: async (req,res) => {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).send(RestResponse.error("User id is missing."));
        }
        const userObj = await User.deleteOne({id: userId});
        if(userObj) {
            if(userObj.deletedCount > 0)  {
                return res.status(200).send(RestResponse.success(null,'User deleted successfully.'));
            } else {
                return res.status(404).send(RestResponse.error('User not found.'));
            }
        }
    }
};

module.exports = UserService;