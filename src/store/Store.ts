export type UserId = string;

export interface Chat {
    id: string;
  userId: string;
  name: string;
  message: string;
  upvotes: UserId[]; //who has upvoted what
}

export abstract class Store {
  constructor() {}

  initRoom(roomId:string) {}

  getChats(roomId: string, limit: number, offset: number) {}

  addChat(userId:UserId, name:string,roomId: string,message:string) {}

  upVote(userId:UserId,roomId: string, chatId: string) {}
}
