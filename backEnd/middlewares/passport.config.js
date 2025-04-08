import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import { generateToken } from "../helpers/token.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
dotenv.config();

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err, null);
  }
});

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BACKEND_URL + process.env.GOOGLE_CALLBACK,
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      console.log("Google profile:", profile);
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {

        const existingUser = await User.findOne({ email: profile.emails[0].value });

            if (existingUser) {
                
                existingUser.googleId = profile.id;
                await existingUser.save();
                return done(null, existingUser);
            }

        user = await User.create({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
          googleId: profile.id,
          password: await bcrypt.hash(Math.random().toString(36), 10)
        });
      }
      return cb(null, user);
    } catch (error) {
      console.error('Errore nell\'autenticazione Google:', error);
      cb(error);
    }
  }
);

export default googleStrategy;
