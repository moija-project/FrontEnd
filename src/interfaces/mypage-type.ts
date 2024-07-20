import { ClubConditionType } from "./post-type";

export type RequestUserType = {
  nickname: string;
  waitingId: number;
  _ask: boolean;
};
export type ReceivedChatRequestType = {
  users: RequestUserType[] | [];
  title: string;
  post_id: number;
  latest_write: string;
};

export type ChatRequestStoreType = {
  nickname: string | null;
  title: string; // 게시물 제목
  type: "received" | "sent";
  waiting_id: number;
  post_id: number;
};

// 모임장의 답변 확인하기 응답 타입
export type ReadReceivedAnsResType = {
  nickname: string;
  gender: string;
  genaration: string;
  qnas: ClubConditionType[];
  _ask: boolean;
  user_id: string;
  // 더 있긴 한데 이건 다시 한번 더 보기
};

// 푸쉬 알림 응답 타입
export type NotifyResType = {
  pushId: string;
  messasge: string;
  nonRead: boolean;
  pushType: number;
  link: string;
  pubDate: string;
};
