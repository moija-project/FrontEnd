import { useCallback, useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import TextMsgBox from "./components/TextMsgBox";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import MsgInputWrapper from "./components/MsgInputWrapper";
import { useFetchPrevChatMessages } from "../../api/service-api/chat/useFetchPrevChatMessages";
import { useRecoilValue } from "recoil";
import { myProfileInfoState } from "../../store/userStore";
import MyTextMsgBox from "./components/MyTextMsgBox";
import { useInView } from "react-intersection-observer";

type ChatListItemType = {
  sendUserId: string;
  message: string;
  date: string;
  time: string;
  nickname: string;
};

export default function ChatRoomScreen() {
  const { chatRoomId } = useParams();
  const { state } = useLocation(); // ChatListItemResType
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [chatList, setChatList] = useState<ChatListItemType[]>([]); // 채팅 기록
  const [txtMessage, setTxtMessage] = useState(""); // 입력하는 채팅 문자
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const userInfo = useRecoilValue(myProfileInfoState);

  const chattingsRef = useRef<any>(null);

  useEffect(() => console.log("-----------------", state), [state]);

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  const { data, refetch } = useFetchPrevChatMessages({
    chatRoomId: chatRoomId ?? "",
    page_size: 80,
    page_number: pageNum,
  });

  // const chatList = data?.pages.flat() || []

  // 메시지 보내기 클릭 혹은 엔터 쳤을 경우
  const handleSendMsg = () => {
    if (!stompClient || txtMessage.trim().length === 0) return;
    // stompClient.connect({}, () => {
    // });
    stompClient.publish({
      destination: `/pub/chat.message.${chatRoomId}`,
      body: JSON.stringify({
        memberId: userInfo.user_id,
        message: txtMessage,
        nickname: userInfo.nickname,
      }),
    });
  };

  // 챗 리스트의 디폴트는 항상 가장 최신 즉, 가장 아래 로 포커스

  const handleFocusBottom = useCallback(() => {
    if (!chattingsRef.current) return;
    chattingsRef.current.scrollTop = chattingsRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    );
    const sock = new SockJS(`/stomp/chat`);
    const stompClient = Stomp.over(sock);

    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/exchange/chat.exchange/room.${chatRoomId}`,
        (message: IMessage) => {
          const parsedBody = JSON.parse(message.body);

          let date = parsedBody.regDate.slice(0, 10);
          let time = parsedBody.regDate.slice(11, 16);

          let newMsgItem: ChatListItemType = {
            sendUserId: parsedBody.memberId,
            message: parsedBody.message,
            date,
            time,
            nickname: parsedBody.nickname,
          };

          if (parsedBody.type !== "CHAT") {
            setChatList((prevMessages) => [...prevMessages, newMsgItem]);
            handleFocusBottom(); // 메시지 보내면 포커스 아래로
          }
        }
      );

      // // 읽음 처리
      // stompClient.publish({
      //   destination: `/pub/chat.read.${chatRoomId}`,
      //   body: JSON.stringify({
      //     read: 1,
      //   }),
      // });
    });
    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      setChatList([]);
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (chatList) handleFocusBottom();
  }, [chatList]);

  // useEffect(() => {
  //   // if (inView && hasMore) {
  //   if (inView && hasMore) {
  //     setPageNum((prevPageNum) => prevPageNum + 1);
  //   }
  // }, [inView, hasMore]);

  // useEffect(() => {
  //   if (!data || data?.length === 0) {
  //     setHasMore(false);
  //   }
  // }, [data]);

  useEffect(() => {
    // 페이지네이션으로 추가되는 chat list
    let prevChatList: ChatListItemType[] | [] = data
      ? data
          ?.filter((val) => val.type === "TALK")
          .map((chat, i) => ({
            sendUserId: chat.memberId,
            message: chat.message,
            date: chat.regDate.slice(0, 10),
            time: chat.regDate.slice(11, 16),
            nickname: chat.nickname,
          }))
      : [];
    let newChatList = [...prevChatList.reverse(), ...chatList];
    setChatList(newChatList);
  }, [data]);

  useEffect(() => {
    if (pageNum > 0 && hasMore) refetch();
  }, [pageNum]);

  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0, flex: 1 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Container>
        <ChatRoomHeader
          postId={state.chatInfo.chatRoom.recruitId ?? ""}
          waitingId={state.chatInfo.waitingId}
        />
        <ChattingsContainer ref={chattingsRef}>
          <ChattingsWrapper>
            {/* for 무한스크롤 */}
            {hasMore && <HasMoreWrapper ref={ref} />}
            {/*  */}
            {chatList.map(
              (item, idx) =>
                item.sendUserId &&
                (item.sendUserId === userInfo.user_id ? (
                  <MyTextMsgBox
                    key={`chat-msg_${idx}`}
                    text={item.message}
                    time={item.time}
                  />
                ) : (
                  <TextMsgBox
                    key={`chat-msg_${idx}`}
                    text={item.message}
                    time={item.time}
                    name={item.nickname}
                  />
                ))
            )}
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

const HasMoreWrapper = styled.div`
  width: 100%;
  height: 20px;
  /* background-color: palegoldenrod; */
`;
