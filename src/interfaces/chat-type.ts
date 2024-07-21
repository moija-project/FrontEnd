// chat list 관련 타입
export type ChatListItemResType = {
  chatRoom: ChatListItemChatRoomType;
  lastChat: string;
  nonRead: number;
  receivedTime: string;
  waitingId: number | null;
};

export type ChatListItemChatRoomType = {
  chatName: string;
  chatRoomId: string;
  recruitId: number;
};

// 채팅방 메시지 조회
export type ChatMessageListReqType = {
  chatRoomId: string;
  page_size: number;
  page_number: number;
};
export type ChatMessageListType = {
  message: string;
  memberId: string;
  nickname: string;
  regDate: string;
  type: string;
};

// chat room 생성
export type CreateChatReqType = {
  myUserId: string;
  chat: {
    userId: string; // 상대방 아이디
    nickname: string;
    postId: number;
    postTitle: string;
  };
};
