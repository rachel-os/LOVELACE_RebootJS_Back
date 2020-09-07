import { Document, Schema, model, Model } from 'mongoose';
import { SHA256 } from 'crypto-js';

//j'ai besoin d'exporter pour pouvoir préciser le typage adéquat (qui ne peut être undefined).
export interface IProfile extends Document {
  email: string;
  lastname: string;
  firstname: string;
  getFullName: () => string;
  setPassword: (password: string)  => void;
  checkPassword: (password : string) => boolean;
}

//je définis des contraintes sur ma DB grâce à mongoose 
const profileSchema = new Schema ({
  email: { type: String, required: true, unique: true},
  lastname: { type: String, required: true},
  firstname: { type: String, required: true},
  password: { type: String, required: true}
});

profileSchema.methods.getFullname = function () {
  return `${this.firstname} ${this.lastname}`
}

profileSchema.methods.setPassword = function (password:string) {
  this.password = SHA256(password).toString();
}

profileSchema.methods.checkPassword = function (password:string) {
  return this.password === SHA256(password).toString();
}

//je lie mon interface de code (l.3) avec mongoDB que l'on doit stocker dans collection "profile" de moongoose
export const Profile = model<IProfile, Model<IProfile>>("profile", profileSchema)
