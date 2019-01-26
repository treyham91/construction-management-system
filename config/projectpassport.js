const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Project = mongoose.model("project");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = projectPassport => {
    projectPassport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
            Project.findById(jwt_payload.id)
                .then(project => {
                    if (project) {
                        return done(null, project);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};