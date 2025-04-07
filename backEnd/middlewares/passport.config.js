import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/userModel.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BACKEND_URL + process.env.GOOGLE_CALLBACK,
  },
  async function (accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    }

    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
           cb(err,  {jwtToken} );
        }
    );
      }
    );

export default googleStrategy;
