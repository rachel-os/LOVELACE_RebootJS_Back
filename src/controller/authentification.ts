import { Handler } from "express";
import passport from "passport";
import {Strategy} from "passport-local";
import { Profile } from "../models/profiles";

// quelle stratégie adopter lorsqu'on récupère un mdp et un username

passport.use(
  new Strategy((username: string, password: string, done) => {
    try {

      // Existe-il quelqu'un avec ce username ?
      Profile.findOne({email: username}, null, (err, profile) => {
        if(err) {return done(err); }

        // Si j'ai le bon mdp, alors je peux continuer et passer à la suite avec la fonction "done"
        if(profile) {
          const hasCorrectPassword = profile.checkPassword(password);
          if(hasCorrectPassword) {return done(null, profile) };
        }
        return done (new Error("Profile not found."));
      })
    } catch(error) {
      done(error)
    }
  })
);

export const authenticationInitialize = (): Handler => passport.initialize(); 