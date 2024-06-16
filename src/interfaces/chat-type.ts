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

// 채팅방 메시지 조회
export type ChatMessageListType = {
  chatRoomId: string;
  message: string;
  userId: string;
  regDate: number[];
};

export type ChatMessageListResType = {
  msg: ChatMessageListType[];
};
