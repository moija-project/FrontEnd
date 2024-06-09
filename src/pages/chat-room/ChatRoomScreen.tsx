import React, { useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextMsgBox from "./components/TextMsgBox";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client, Message, Stomp } from "@stomp/stompjs";

export default function ChatRoomScreen() {
  // const client = useRef<CompatClient>();
  const { chatRoomId } = useParams();
  const [txtMessage, setTxtMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [stompClient, setStompClient] = useState<any>(null);
  const [chatList, setChatList] = useState<any[]>([]); // 채팅 기록
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수

  useEffect(() => {
    // const client = new Client({
    //   brokerURL: "ws://mo.ija.kro.kr/stomp/ws",
    //   onConnect: () => {
    //     client.subscribe(
    //       `/pub/chat.enter.${chatRoomId}`,
    //       (message: Message) => {
    //         console.log("메시지: ", message);
    //         setChatList((prev) => [...prev, message.body]);
    //       }
    //     );
    //   },
    //   onDisconnect: () => {
    //     console.log("Disconnected");
    //   },
    // });

    // client.activate();
    // setStompClient(client);

    // return () => {
    //   if (client) {
    //     client.deactivate();
    //   }
    // };

    // const sock = new SockJS(`http://localhost:8093/stomp/ws`);
    const sock = new SockJS(`http://localhost:15672/stomp/ws`);
    // const sock = new SockJS(`http://mo.ija.kro.kr/stomp/ws`);
    const stompClient = Stomp.over(sock);
    stompClient.connect({}, () => {
      console.log("hello");
      stompClient.subscribe(`/pub/chat.enter.${chatRoomId}`, (message: any) => {
        // setMessages((prevMessages) => [...prevMessages, message.body]);
        console.log("!!!!!!!!!! 메시지 :: ", message);
      });
    });
    setStompClient(stompClient);
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => console.log(">>ERROR<<"));
      }
    };
  }, [chatRoomId]);

  // useEffect(() => {
  //   connect();
  //   return () => disConnect();
  // }, []);

  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0, flex: 1 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Container>
        <ChatRoomHeader />
        <ChattingsContainer>
          <ChattingsWrapper>
            <TextMsgBox
              text="dkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudgdkssudg"
              time="12:40"
              profile={{
                name: "홍길동",
                profileImg:
                  "https://i.pinimg.com/736x/68/15/1e/68151e7ec66a2f5eddaacfd895e3bcd2.jpg",
              }}
            />
            <TextMsgBox
              text="dkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdydkssudgktpdy"
              time="13:00"
            />
          </ChattingsWrapper>
        </ChattingsContainer>
        {/* <MsgInputWrapper setMsg={setTxtMessage} msg={txtMessage} /> */}
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
