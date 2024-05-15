// chat list 관련 타입
export type ChatListItemResType = {
  chatRoom: ChatListItemChatRoomType;
  lastChat: string;
  nonRead: number;
};

export type ChatListItemChatRoomType = {
  chatName: string;
  chatRoomId: string;
  recruitId: number;
};
