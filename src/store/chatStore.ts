import { atom } from "recoil";
import { ChatListResType } from "../interfaces/chat-type";

export const chatListState = atom<ChatListResType[]>({
  key: "chatListState",
  default: [],
});
