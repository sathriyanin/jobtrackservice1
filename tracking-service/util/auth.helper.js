const Jwt = require('../config/jwt');
const AuthHelper = {
    generateToken : (payload) => {
        return Jwt.sign({username: payload.username,id: payload.id,roles: payload.roles,companyId: payload.companyId});
    }
}

module.exports = AuthHelper;