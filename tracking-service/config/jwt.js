const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY_TOKEN;

const verify = (token) => {
    try {
        const decodeStr = jwt.verify(token,secretKey);
        return decodeStr;
    } catch(err) {
        throw err;
    }
};

const sign = (payload) => {
    try{
        const token = jwt.sign(payload,secretKey,{expiresIn: '15m'});
        return token;
    } catch(err) {
        throw err;
    }
}

module.exports = {verify,sign};