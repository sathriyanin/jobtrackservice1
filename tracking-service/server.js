require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const mongoose = require('mongoose');
const connectToDb = require('./config/mongodb');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const orgRoute = require('./routes/orgRoute');
const employeeRoute = require('./routes/employeeRoute');
const customerRoute = require('./routes/customerRoute');
const machineRoute = require('./routes/machineRoute');
const workOrderRoute = require('./routes/workOrderRoute');
const workOrderAssignmentRoute = require('./routes/workOrderRouteAssignment');

const appHelper = require('./util/app.helper');
const pathConfig = {
    version: 'v1',
    name: 'tracking',
    getPathPrefix: function() {
        return `/${this.name}/${this.version}/api`;
    }
}
const excludeUrl = ['login','register'];

app.use(pathConfig.getPathPrefix(),router);
router.use(cors());
router.use(function(req,res,next) {
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
router.use('/user',userRoute);
router.use('/org',orgRoute);
router.use('/auth',authRoute);
router.use('/employee',employeeRoute);
router.use('/customer',customerRoute);
router.use('/machine',machineRoute);
router.use('/workorder',workOrderRoute);
router.use('/assignment',workOrderAssignmentRoute);

connectToDb();
const PORT =  process.env.PORT || 3000;
mongoose.connection.once('open', () => {
    console.log('Connected to Monogo DB.');
});

app.listen(PORT,() => {
    console.log(`Server started and running on port ${PORT}`);
});

