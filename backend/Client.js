const express = require("express");
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const config = require("./config");
const app = express();
const server = http.createServer(app);
const rateLimit = require("express-rate-limit");
const EventEmitter = require("events");
const events = new EventEmitter();
const { log } = require('./utils');

class Client {
    warmDatabase() {
        require('./config/database');
        log('DATABASE', 'Warming up.');
    }

    warmModels() {
        require('./models');
        log('MODELS', 'Warmed up.');
    }

    get package() {
        return require('../package.json');
    }

    ExpressInit() {
        require('./config/passport')(passport);

        const limiter = rateLimit({
            windowMs: 500,
            max: 100
        });

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use(limiter);
        app.use(passport.initialize());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());

        app.use(require('./routes'));

        server.listen(config.express.port, () => {
            log('EXPRESS', 'Listening.');
        });
    }

    get events() {
        return events;
    }
}

module.exports = new Client;