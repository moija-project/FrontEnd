import { useQuery } from "react-query";
import {
  ChatMessageListReqType,
  ChatMessageListType,
} from "../../../interfaces/chat-type";
import { axiosAuth } from "../../settingAxios";

// 채팅방 이전 대화 목록 조회
const fetchChatMessages = async (
  req: ChatMessageListReqType
): Promise<ChatMessageListType[] | undefined> => {
  const url = `/message/list`;
  try {
    const res = await axiosAuth.post(url, req);
    return res.data.result.content;
  } catch (error) {
    console.error(error);
  }
};

export const useFetchPrevChatMessages = (req: ChatMessageListReqType) => {
  // const setChatList = useSetRecoilState(chatListState);
  return useQuery({
    queryKey: ["chat-msg-list", `messages-${req.chatRoomId}`],
    queryFn: () => fetchChatMessages(req),
    enabled: false,
  });
};
