const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = require("bluebird");
const { log } = require('../utils');

if(process.env.NODE_ENV === 'production') {
    mongoose.connect(config.mongodb.STRING_PROD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        log('DATABASE', 'Warmed up.');
    });
} else {
    mongoose.connect(config.mongodb.STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        log('DATABASE', 'Warmed up.');
    });
};