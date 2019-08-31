const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Principal = mongoose.model("principal");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      Principal.findById(jwt_payload.id)
        .then(admin => {
          if (admin) {
            return done(null, admin);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};
