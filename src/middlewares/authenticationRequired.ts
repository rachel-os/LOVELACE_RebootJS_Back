import { Request, Response, NextFunction } from "express";

//ce que je vais appeler si je peux passer à la suite (lorsque l'utilisateur est connecté)
export function authenticationRequired(req: Request, res: Response, next: NextFunction){
 if(req.isAuthenticated()) return next();
 return res.status(401).send();
}