import { useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import TextMsgBox from "./components/TextMsgBox";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import MsgInputWrapper from "./components/MsgInputWrapper";
import { useFetchPrevChatMessages } from "../../api/service-api/chat/useFetchPrevChatMessages";
import { useRecoilValue } from "recoil";
import { myProfileInfoState } from "../../store/userStore";

type ChatListItem = {
  sendUserId: string;
  message: string;
  date: number[];
  nickname: string;
};

export default function ChatRoomScreen() {
  const { chatRoomId } = useParams();
  const [stompClient, setStompClient] = useState<CompatClient>();
  const [chatList, setChatList] = useState<ChatListItem[]>([]); // 채팅 기록
  const [txtMessage, setTxtMessage] = useState(""); // 입력하는 채팅 문자

  const userInfo = useRecoilValue(myProfileInfoState);

  const chattingsRef = useRef<any>(null);

  const { refetch, data } = useFetchPrevChatMessages(chatRoomId ?? "");

  const handleSendMsg = () => {
    if (!stompClient) return;
    stompClient?.publish({
      destination: `/pub/chat.message.${chatRoomId}`,
      body: JSON.stringify({
        memberId: userInfo.user_id,
        message: txtMessage,
        nickname: userInfo.nickname,
      }),
    });
  };

  useEffect(() => {
    const sock = new SockJS(`/stomp/chat`);
    const stompClient = Stomp.over(sock);
    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/exchange/chat.exchange/room.${chatRoomId}`,
        (message: IMessage) => {
          let newMsgItem: ChatListItem = {
            sendUserId: JSON.parse(message.body).memberId,
            message: JSON.parse(message.body).message,
            date: JSON.parse(message.body).regDate,
            nickname: JSON.parse(message.body).nickname,
          };
          setChatList((prevMessages) => [...prevMessages, newMsgItem]);
        }
      );
    });

    setStompClient(stompClient);

    refetch();

    return () => {
      console.log("######close!!!");
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [chatRoomId]);

  useEffect(() => {
    // 디폴트는 항상 가장 최신 즉, 가장 아래 로 포커스
    if (chattingsRef.current) {
      chattingsRef.current.scrollTop = chattingsRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0, flex: 1 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Container>
        <ChatRoomHeader />
        <ChattingsContainer ref={chattingsRef}>
          <ChattingsWrapper>
            {chatList.map((item, idx) => (
              <TextMsgBox
                key={`chat-msg_${idx}`}
                text={item.message}
                time={item.date[3] + ":" + item.date[4]}
                profile={
                  item.sendUserId === userInfo.user_id
                    ? undefined
                    : {
                        name: item.nickname,
                        profileImg:
                          "https://i.pinimg.com/736x/68/15/1e/68151e7ec66a2f5eddaacfd895e3bcd2.jpg",
                      }
                }
              />
            ))}
          </ChattingsWrapper>
        </ChattingsContainer>
        <MsgInputWrapper
          onSend={handleSendMsg}
          setMsg={setTxtMessage}
          msg={txtMessage}
        />
      </Container>
    </CommonContainer>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const ChattingsContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 2rem 0;
`;

const ChattingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
