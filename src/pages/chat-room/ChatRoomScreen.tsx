import React, { useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import styled from "styled-components";
import ChatRoomHeader from "./components/ChatRoomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import MsgInputWrapper from "./components/MsgInputWrapper";
import TextMsgBox from "./components/TextMsgBox";

export default function ChatRoomScreen() {
  const [txtMessage, setTxtMessage] = useState("");

  return (
    <CommonContainer
      boxStyle={{ width: 500, padding: 0 }}
      containerStyle={{ position: "relative", width: "100%" }}
    >
      <Container>
        <ChatRoomHeader />
        <TextMsgBox isMe={false} text="dkssudg" time="12:40" />
        <TextMsgBox
          isMe
          text="dkssudgktpdydkssudgktpdydkssudgktpdy"
          time="13:00"
        />
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
