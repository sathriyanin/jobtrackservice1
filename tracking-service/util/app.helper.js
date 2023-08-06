const jwtHelper = require('../config/jwt');

const AppHelper = {
    getTokenFromBearer : (authString) => {
        if(authString) {
            const token = authString.split(' ')[1];
            return token
        }
    },
    validateToken: (token) => {
        try {
            return jwtHelper.verify(token);
        } catch(err) {
            return false;
        }

    }
}

module.exports = AppHelper;