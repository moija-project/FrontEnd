import { useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import TextMsgBox from "./components/TextMsgBox";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import MsgInputWrapper from "./components/MsgInputWrapper";
import {
  fetchChatMessages,
  useFetchPrevChatMessages,
} from "../../api/service-api/chat/useFetchPrevChatMessages";
import { useRecoilValue } from "recoil";
import { myProfileInfoState } from "../../store/userStore";
import MyTextMsgBox from "./components/MyTextMsgBox";
import InfiniteScroll from "react-infinite-scroll-component";

type ChatListItemType = {
  sendUserId: string;
  message: string;
  date: string;
  time: string;
  nickname: string;
};

export default function ChatRoomScreen() {
  const { chatRoomId } = useParams();
  const [stompClient, setStompClient] = useState<CompatClient>();
  const [chatList, setChatList] = useState<ChatListItemType[]>([]); // 채팅 기록
  const [txtMessage, setTxtMessage] = useState(""); // 입력하는 채팅 문자
  const [pageNum, setPageNum] = useState(0);

  const userInfo = useRecoilValue(myProfileInfoState);

  const chattingsRef = useRef<any>(null);

  const { data, refetch } = useFetchPrevChatMessages({
    chatRoomId: chatRoomId ?? "",
    page_size: 40,
    page_number: pageNum,
  });
  // const { data, fetchNextPage, hasNextPage , isFetchingNextPage } = useFetchPrevChatMessages({
  //   chatRoomId: chatRoomId ?? "",
  //   page_size: 10,
  //   page_number: 0,
  // });

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
  const handleFocusBottom = () => {
    if (!chattingsRef.current) return;
    if (chattingsRef.current) {
      chattingsRef.current.scrollTop = chattingsRef.current.scrollHeight;
    }
  };

  useEffect(() => {
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
          setChatList((prevMessages) => [...prevMessages, newMsgItem]);
          handleFocusBottom(); // 메시지 보내면 포커스 아래로
        }
      );
      // stompClient.publish({
      //   destination: `/pub/chat.read.${chatRoomId}`,
      //   body: JSON.stringify({
      //     read: 1,
      //   }),
      // });
    });

    setStompClient(stompClient);
    console.log("## ", stompClient);

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

  const fetchMessages = async (page_number: number) => {
    const res = await fetchChatMessages({
      chatRoomId: chatRoomId ?? "",
      page_size: 10,
      page_number,
    });
    let newMessages = res?.map((chat, _) => ({
      sendUserId: chat.memberId,
      message: chat.message,
      date: chat.regDate.slice(0, 10),
      time: chat.regDate.slice(11, 16),
      nickname: chat.nickname,
    }));
    // newMessages&&
    //   setChatList((prev) => [...newMessages.reverse(), ...prev]);
  };

  useEffect(() => {
    // 페이지네이션으로 추가되는 chat list
    let prevChatList: ChatListItemType[] | [] = data
      ? data?.map((chat, i) => ({
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

  useEffect(() => console.log(">> ", chatList), [chatList]);

  useEffect(() => {
    if (pageNum > 0) refetch();

    console.log("==== , ", pageNum);
  }, [pageNum]);

  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0, flex: 1 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Container>
        <ChatRoomHeader />
        <ChattingsContainer ref={chattingsRef}>
          <ChattingsWrapper>
            {/* for 무한스크롤 */}
            {/* {hasMore && <HasMoreWrapper ref={ref} />} */}
            {/*  */}

            <InfiniteScroll
              dataLength={chatList.length}
              next={() => setPageNum(pageNum + 1)}
              loader={<>loading...</>}
              hasMore={data?.length !== 0}
            >
              {chatList.map((item, idx) =>
                item.sendUserId === userInfo.user_id ? (
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
                    profileImg={
                      "https://i.pinimg.com/736x/68/15/1e/68151e7ec66a2f5eddaacfd895e3bcd2.jpg"
                    }
                  />
                )
              )}
            </InfiniteScroll>
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
`;
