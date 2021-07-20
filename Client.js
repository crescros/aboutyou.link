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

class Client {
    warmDatabase() {
        require('./config/database');
    }

    warmModels() {
        require('./models');
    }

    get package() {
        return require('../package.json');
    }

    ExpressInit() {
        require('./config/passport')(passport);

        const limiter = rateLimit({
            windowMs: 1000,
            max: 1
        });

        app.use(limiter);
        app.use(passport.initialize());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());

        app.use(require('./routes'));

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        server.listen(config.express.port, () => {
            console.log(`Listening to port ${config.express.port}.`);
        });
    }

    get events() {
        return events;
    }
}

module.exports = new Client;