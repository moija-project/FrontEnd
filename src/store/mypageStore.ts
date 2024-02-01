import { atom } from "recoil";
import { ChatRequestStoreType } from "../interfaces/mypage-type";
import { postListResType } from "../interfaces/post-type";

// 받은 요청
export const fetchRequestListState = atom<ChatRequestStoreType[]>({
  key: "fetchRequestListState",
  default: [],
});

// 내가 스크랩한 글
export const fetchMyScrapListState = atom<postListResType[]>({
  key: "fetchMyScrapListState",
  default: [],
});
