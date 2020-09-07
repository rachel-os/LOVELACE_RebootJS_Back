import { Request, Response, Router } from 'express';
import passport from "passport";

const router = Router();

router.post('/', 
(req: Request, res: Response) => {
  passport.authenticate('local', (err, profile) => {
    if(err) return res.status(500).send('An error occurred');
    if(profile) {
      // TODO : créer session avec req.logIn / Express Session
    } else {
      return res.status(401).send('Who are you?!!! Where are we?');
    }
  })
});

export default router;