import React, { useEffect, useRef, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { CompatClient, Stomp } from "@stomp/stompjs";
import MsgInputWrapper from "./components/MsgInputWrapper";
import TextMsgBox from "./components/TextMsgBox";

export default function ChatRoomScreen() {
  const client = useRef<CompatClient>();
  const [txtMessage, setTxtMessage] = useState("");

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
        <MsgInputWrapper setMsg={setTxtMessage} msg={txtMessage} />
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
