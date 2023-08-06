require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
const connectToDb = require('../config/mongodb');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const userRoute = require('../routes/userRoute');
const authRoute = require('../routes/authRoute');
const orgRoute = require('../routes/orgRoute');
const employeeRoute = require('../routes/employeeRoute');
const customerRoute = require('../routes/customerRoute');
const workOrderRoute = require('../routes/workOrderRoute');

const appHelper = require('../util/app.helper');

const pathConfig = {
    version: 'v1',
    name: 'tracking',
    getPathPrefix: function() {
        return `/${this.name}/${this.version}/api`;
    }
}
const excludeUrl = ['login','register'];
app.use(function(req,res,next) {
    const headers = req.headers;
    if(!excludeUrl.find(url => req.url.match(url))) {
        const token = appHelper.getTokenFromBearer(headers.authorization);
        const isValid = appHelper.validateToken(token);
        if(isValid) {
            req.requestContext = isValid;
            next();
        } else {
            res.send(401).send('Un Authorized.');
            return;
        }
    } else {
        next();
    }
});

app.use(pathConfig.getPathPrefix(),router);
router.use('/user',userRoute);
router.use('/org',orgRoute);
router.use('/auth',authRoute);
router.use('/employee',employeeRoute);
router.use('/customer',customerRoute);
router.use('/workorder',workOrderRoute);

app.use('/.netlify/functions/server', router);

connectToDb();
const PORT =  process.env.PORT || 3000;
mongoose.connection.once('open', () => {
    console.log('Connecto to Monogo DB.');
});

module.exports = app;
module.exports.handlers = serverless(app);

