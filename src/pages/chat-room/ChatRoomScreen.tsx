import React, { useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as StompJs from "@stomp/stompjs";
import TextMsgBox from "./components/TextMsgBox";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import io from "socket.io-client";

export default function ChatRoomScreen() {
  // const client = useRef<CompatClient>();
  const { chatRoomId } = useParams();
  const [txtMessage, setTxtMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  let [client, changeClient] = useState<StompJs.Client | null>(null);
  const [chatList, setChatList] = useState<any[]>([]); // 채팅 기록
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://http://mo.ija.kro.kr/chat",
        connectHeaders: {
          login: "",
          passcode: "password",
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/pub/chat.enter." + chatRoomId, callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };
  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  // 콜백함수 => ChatList 저장하기
  const callback = function (message: StompJs.IMessage) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
    }
  };

  const sendChat = () => {
    if (chat === "" || !client) {
      return;
    }

    client.publish({
      destination: "/pub/chat/" + chatRoomId,
      body: JSON.stringify({
        memberId: "snyeg28842", // fix!!
        message: "hihi",
        nickname: "??",
      }),
    });

    setChat("");
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);
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
