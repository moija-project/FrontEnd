import { useQuery } from 'react-query';
import { axiosAuth } from '../../settingAxios';
import { useSetRecoilState } from 'recoil';
import { chatListState } from '../../../store/chatStore';
import { ChatListItemResType } from '../../../interfaces/chat-type';

// 채팅방 목록 조회
const postChatList = async (): Promise<ChatListItemResType[] | undefined> => {
  const url = `/message/box`;
  try {
    const res = await axiosAuth.post(url);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const useFetchChatList = () => {
  const setChatList = useSetRecoilState(chatListState);
  return useQuery({
    queryKey: ['chat-list'],
    queryFn: postChatList,
    onSuccess: (data) => data && setChatList(data.reverse()),
  });
};
