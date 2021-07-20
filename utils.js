const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const atob = require('atob');
const fetch = require('node-fetch');

const pathToKey = path.join(__dirname, 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
};

function validateJWT(next, token) {
    if(!token) return next('no token provided');
    const obj = JSON.parse(atob(token.split('.')[1]));
    if(!obj.sub) return next('couldn\'t get the user from the jwt token');
    if(!obj.exp) return next('couln\'t get exp time from the jwt token');
    console.log(obj.exp, Date.now())
    if(obj.exp < Date.now()) return next('user token timeout');

    return obj;
}

function issueJWT(user) {
    const _id = user._id;
    const expiresIn = 8.64e+7;

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedTOken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedTOken,
        expires: expiresIn
    }
};

function validateEmail(email) {
    if(email == 0) return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function beautifyUser(user) {
    delete user["email"];
    delete user["hash"];
    delete user["salt"];

    return user;
}

module.exports.beautifyUser = beautifyUser;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.validateJWT = validateJWT;
module.exports.validateEmail = validateEmail;