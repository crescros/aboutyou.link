const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    algorithms: [ 'RSA256' ]
};

module.exports = passport => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log(jwt_payload);

        User.findOne({ _id: jwt_payload.sub}, function(err, user) {
            if(err) return done(err, false);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            };
        });
    }));
};