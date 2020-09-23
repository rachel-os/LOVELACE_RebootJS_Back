import { Message, IMessage } from '../models/messages';
import { IProfile } from '../models/profiles';

async function getAllMessages(user: IProfile, conversationId?: string){
  try {
    const userId = user._id;
    const query : { $or: any, $and: any } = {
      // Je fais soit partie des participants ("targets"), soit l'emetteur (emitter) du message
      $or: [
        { emitter: userId},
        { targets : userId}
      ],
      $and : [{ conversationId: conversationId }]
    }
    if(!conversationId) delete query.$and
    const messages = await Message.find(
      query,
      null,
      { sort: { createdAt: 'asc' }}
    );
    return messages;
  } catch (error) {
    throw new Error('Error while searching for these messages in the database.')
  }
}

async function createMessage(conversationId: string, targets: string[], emitter: string, content: string){
  const message = new Message({conversationId, targets, emitter, content})
  return await message.save();
}

export {
  getAllMessages,
  createMessage
} 