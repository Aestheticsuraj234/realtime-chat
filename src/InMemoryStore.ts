import { Chat, Store, UserId } from "./store/Store";

let GLOBAL_CHAT_ID = 0;
export interface Room {
  roomId: string;
  chats: Chat[];
}

export class InMemeoryStore implements Store {
  private store: Map<string, Room>;
  constructor() {
    this.store = new Map<string, Room>();
  }

  initRoom(roomId: string) {
    this.store.set(roomId, { roomId, chats: [] });
  }

  getChats(roomId: string, limit: number, offset: number) {
    const room = this.store.get(roomId);
    if (!room) return [];
    return room.chats
      .reverse()
      .slice(0, offset)
      .slice(-1 * limit);
  }

  addChat(userId: UserId, name: string, roomId: string, message: string) {
    const room = this.store.get(roomId);
    if (!room) return [];
    room.chats.push({
      id: (GLOBAL_CHAT_ID++).toString(),
      userId,
      name,
      message,
      upvotes: [],
    });
  }

  upVote(userId:UserId,roomId: string, chatId: string) {
    const room = this.store.get(roomId);
    if (!room) return [];
    //    TODO:MAKE THIS FASTER
    const chat = room.chats.find(({ id }) => id === chatId);

    if (chat) {
      chat.upvotes.push(chatId);
    }
  }
}
