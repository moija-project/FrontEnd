import { useQuery } from "react-query";
import { ChatMessageListResType } from "../../../interfaces/chat-type";
import { axiosAuth } from "../../settingAxios";

// 채팅방 이전 대화 목록 조회
const fetchChatMessages = async (
  chatRoomId: string
): Promise<ChatMessageListResType | undefined> => {
  const url = `/message/list`;
  try {
    const res = await axiosAuth.post(url, { chatRoomId: chatRoomId });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const useFetchPrevChatMessages = (chatRoomId: string) => {
  // const setChatList = useSetRecoilState(chatListState);
  return useQuery({
    queryKey: ["chat-msg-list"],
    queryFn: () => fetchChatMessages(chatRoomId),
    enabled: false,
  });
};
