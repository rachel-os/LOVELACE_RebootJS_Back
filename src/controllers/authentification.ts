import passport from "passport";
import { Handler } from "express";
import { Profile, IProfile } from "../models/profiles";
import { Strategy } from "passport-local";

// quelle stratégie adopter lorsqu'on récupère un mdp et un username
passport.use(
  new Strategy((username: string, password: string, done) => {
    try {
      // Existe-il quelqu'un avec ce username ?
      Profile.findOne({email: username}, null, (err, profile) => {
        if(err) {return done(err); }

        // Middleware : si j'ai le bon mdp, alors je peux continuer et passer à la suite avec la fonction "done"
        if(profile) {
          const hasCorrectPassword = profile.checkPassword(password);
          if(hasCorrectPassword) {return done(null, profile) };
        }
        return done(new ProfileNotFoundError("Profile not found."));
      })
    } catch(error) {
      return done(error)
    }
  })
);

passport.serializeUser(
  ({ _id }: IProfile, done) => { done(null, _id) }
);

passport.deserializeUser(
  (_id, done) => {
    Profile.findById(_id, (err, profile) => {
      if(err) { return done(err) };
      return done(undefined, profile);
    });
  }
)

// utilise passport et passport utilise session 
export const authenticationInitialize = (): Handler => passport.initialize();
export const authenticationSession = (): Handler => passport.session();

export class ProfileNotFoundError extends Error {} 