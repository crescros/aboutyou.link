const express = require("express");
const cors = require('cors');
const path = require("path");
const app = express();
const rateLimit = require("express-rate-limit");
const port = 3000

const limiter = rateLimit({
    windowMs: 1000,
    max: 90
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/static/index.html');
});

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});