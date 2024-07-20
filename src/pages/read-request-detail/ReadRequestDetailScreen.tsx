import React, { useEffect, useState } from "react";
import CommonContainer from "../../components/CommonContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import ReadReplyContainer from "./components/ReadReplyContainer";
import {
  ChatRequestStoreType,
  ReadReceivedAnsResType,
} from "../../interfaces/mypage-type";
import {
  postReceivedChatRequestAccept,
  postReceivedChatRequestDetail,
} from "../../api/service-api/mypageApi";
import { createChatRoom } from "../../api/service-api/chat/chatApi";
import { useRecoilValue } from "recoil";
import { myUserIdState } from "../../store/userStore";

export default function ReadRequestDetailScreen() {
  const navigate = useNavigate();
  const myUserId = useRecoilValue(myUserIdState);
  const { state } = useLocation();
  const [reqData, setReqData] = useState<ChatRequestStoreType>(); // 포스트 아이디 및 제목 등
  const [reqDetail, setReqDetail] = useState<ReadReceivedAnsResType>(); // 질문들, 대기자 프로필

  const handleAccept = async () => {
    if (window.confirm(`${reqData?.nickname}님의 요청을 수락하시겠습니까?`)) {
      if (!reqData) return;
      const createChatRes = await createChatRoom({
        myUserId,
        chat: {
          userId: reqDetail?.user_id ?? "",
          nickname: reqDetail?.nickname ?? "",
          postId: reqData.post_id,
          postTitle: reqData.title,
        },
      });
      if (createChatRes) {
        window.alert("요청을 수락했습니다!");
        navigate("/clubList");
      } else {
        window.alert("요청 수락에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    setReqData(state.data);
  }, [state]);
  useEffect(() => {
    const getData = async () => {
      if (!reqData) return;
      const res = await postReceivedChatRequestDetail(reqData.waiting_id);
      setReqDetail(res);
    };
    getData();
  }, [reqData]);
  return (
    <CommonContainer>
      <Title>
        {reqDetail?.nickname} 님 께서
        <br />
        <Link to={`/clubDetail/${reqData?.post_id}`} target="_blank">
          <PostLink>{reqData?.title}</PostLink>
        </Link>{" "}
        을 보고 <br />
        1대1 채팅을 요청했어요!
      </Title>
      <PreviewProfile hasBorder user_id={reqDetail?.user_id} />
      <ReadReplyContainer
        // fix !
        nickname={reqDetail?.nickname ?? ""}
        data={reqDetail?.qnas ?? []}
      />
      <AcceptButton onClick={handleAccept}>
        1대1 채팅 요청 수락하기
      </AcceptButton>
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.8rem;
  margin-bottom: 2.5rem;
`;
const AcceptButton = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: var(--purple);
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.85rem 0;
  margin: 10rem 0;
`;
const PostLink = styled.span`
  color: var(--blue);
`;
