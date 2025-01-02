import { atom } from 'recoil';
import { ChatListItemResType } from '../interfaces/chat-type';

export const chatListState = atom<ChatListItemResType[]>({
  key: 'chatListState',
  default: [],
});
