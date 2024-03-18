import React, { useEffect } from "react";
import styled from "styled-components";
import PreviewProfile from "../../components/PreviewProfile";
import PostListContainer from "./components/PostListContainer";
import ListContainer from "./components/ListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommonContainer from "../../components/CommonContainer";
import { postMyProfile } from "../../api/service-api/profileApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { myProfileInfoState } from "../../store/userStore";
import {
  postReceivedChatRequest,
  postScrapList,
} from "../../api/service-api/mypageApi";
import {
  fetchMyHostListState,
  fetchMyJoinListState,
  fetchMyScrapListState,
  fetchRequestListState,
} from "../../store/mypageStore";
import { ChatRequestStoreType } from "../../interfaces/mypage-type";

export default function MyPageScreen() {
  const userInfo = useRecoilValue(myProfileInfoState);
  const [requestList, setRequestList] = useRecoilState(fetchRequestListState);

  useEffect(() => {
    const fetchList = async () => {
      const requestRes = await postReceivedChatRequest({});     
      console.log(requestRes)
      let transformedArray: ChatRequestStoreType[] = [];
      requestRes?.forEach((post) => {
        post.users.forEach((user) => {
          const type: "received" | "sent" = user._ask ? "received" : "sent";
          transformedArray.push({
            nickname: user.nickname,
            title: post.title,
            type,
            waiting_id: user.waitingId,
            post_id: post.post_id,
          });
        });
      });
      setRequestList(transformedArray);
    };
    fetchList();
  }, []);

  return (
    <CommonContainer>
      <Title>마이페이지</Title>
      <PreviewProfile hasBorder profileData={userInfo} />

      <ListContainer listType="chat-list" />
      <ListContainer listType="host" />
      <ListContainer listType="join" />
      <ListContainer listType="scrap" />
      <ListContainer listType="chat-request" />
    </CommonContainer>
  );
}

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.29rem;
`;
