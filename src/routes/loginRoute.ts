import { Request, Response, Router } from 'express';
import passport from "passport";
import { IProfile } from "../models/profiles";
import { ProfileNotFoundError } from "../controllers/authentification";

const router = Router();

router.post('/', (req: Request, res: Response) => {
  //me renvoie un objet que je pourrai executer comme une fonction en lui donnant la requête et la réponse l.21
  passport.authenticate('local', (err, profile : IProfile) => {
    if(err) {
      if(err instanceof ProfileNotFoundError){
        return res.status(404).send('Profile not found.');
      } else {
        return res.status(500).send('An error occurred.');
      }
    }
    if(profile) {
      // session avec req.logIn / Express Session pour continuer à être authentifié après l'avoir configuré dans le serveur
      req.logIn(profile, (err) => {
        if(err) {	      
          console.error(err);
          return res.status(500).send("Connexion failed.")
        }
      return res.send(profile.getSafeProfile());
      })
    } else {
      return res.status(401).send('Who are you?!!! Where are we?');
    }
  })(req, res);
});

export default router;
