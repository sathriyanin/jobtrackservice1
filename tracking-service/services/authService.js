const User = require("../model/User");
const Jwt = require('../config/jwt');
const bcrypt = require('bcrypt');
const AuthHelper = require("../util/auth.helper");
const RestResponse = require("../util/response.helper");
const Customer = require("../model/Customer");
const AuthService = {
    getAuthorizationDetails: (authString) => {
        try {
            if(authString) {
                const base64String = authString.split(' ')[1];
                const bufferString = Buffer.from(base64String,'base64');
                const decodedString = bufferString.toString('utf8');
                const userDetails = decodedString.split(':');
                return {username: userDetails[0],password: userDetails[1]}
            }
            return null;
        } catch(err) {
            throw err;
        }
    },
    login: async (req,res) => {
        const header = req.headers;
        if(header.authorization) {
            const authCredentials = AuthService.getAuthorizationDetails(header.authorization);
            if(authCredentials) {
                if(!authCredentials.username || !authCredentials.password) {
                    return res.status(400).send(RestResponse.error('Username and password is required.'));
                }
                const existUser =  await User.findOne({$or: [{username: authCredentials.username},{email: authCredentials.username}]});
                if(!existUser) {
                    return res.status(403).send(RestResponse.error('Invalid username and password.'));
                }
                const isValidPassoword = await bcrypt.compare(authCredentials.password,existUser.password)
                if(isValidPassoword) {
                    const accessToken = AuthHelper.generateToken(existUser);
                    return res.status(200).send(RestResponse.success({accessToken,userId: existUser.id}));
                } else {
                    return res.status(403).send(RestResponse.error('Invalid username and password.'));
                }
            } else {
                return res.status(401).send(RestResponse.error('Missing credentials.'))
            }
        } else {
            return res.status(401).send(RestResponse.error('Missing credentials.'))
        }
    },
    clientLogin: async (req,res) => {
        const header = req.headers;
        if(header.authorization) {
            const authCredentials = AuthService.getAuthorizationDetails(header.authorization);
            if(authCredentials) {
                if(!authCredentials.username || !authCredentials.password) {
                    return res.status(400).send(RestResponse.error('Username and password is required.'));
                }
                const existUser =  await Customer.findOne({email: authCredentials.username});
                if(!existUser) {
                    return res.status(403).send(RestResponse.error('Invalid username and password.'));
                }
                const isValidPassoword = await bcrypt.compare(authCredentials.password,existUser.password);
                if(isValidPassoword) {
                    const accessToken = AuthHelper.generateToken(existUser);
                    return res.status(200).send(RestResponse.success({accessToken,clientId: existUser.id}));
                } else {
                    return res.status(403).send(RestResponse.error('Invalid username and password.'));
                }
            } else {
                return res.status(401).send(RestResponse.error('Missing credentials.'))
            }
        } else {
            return res.status(401).send(RestResponse.error('Missing credentials.'))
        }
    },
    registerUser: async (req,res) => {
        const payload = req.body;
        if(!payload.username || !payload.password) {
            return res.send(RestResponse.error('Username and password is required.')).status(400);
        }
        const isUserExist =  await User.findOne({username: payload.username});
        if(isUserExist) {
            return  res.send(RestResponse.error('User is already exist.')).status(409);
        }
        const user = new User(req.body);
        user.password = await bcrypt.hash(payload.password,10);
        const response = await User.create(user);
        if(response) {
            const token = AuthHelper.generateToken(user);
            res.status(200).send(RestResponse.success({token}));
        }
    }

};

module.exports = AuthService;