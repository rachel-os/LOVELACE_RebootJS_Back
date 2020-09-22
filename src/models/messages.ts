import { Document, Schema, model, Model } from 'mongoose';

export interface IMessage extends Document {
  conversationId : string;
  content: string; 
  createdAt: Date;
  emitter: string; 
  targets: string[];
}

//je définis des contraintes sur ma DB grâce à mongoose 
const messageSchema = new Schema ({
  conversationId: { type: String, required: true},
  content: { type: String, required: true},
  createdAt: { type: Schema.Types.Date, required: true },
  emitter: { type: Schema.Types.ObjectId, ref: 'profiles' },
  targets: { type: [{type: Schema.Types.ObjectId, ref: "profile"}], required: true},
});

export const Message = model<IMessage, Model<IMessage>>("message", messageSchema);
