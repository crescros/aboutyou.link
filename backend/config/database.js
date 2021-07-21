const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = require("bluebird");

if(process.env.NODE_ENV === 'production') {
    mongoose.connect(config.mongodb.STRING_PROD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('DB is ready.');
    });
} else {
    mongoose.connect(config.mongodb.STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('DB is ready. (DEV)');
    });
};