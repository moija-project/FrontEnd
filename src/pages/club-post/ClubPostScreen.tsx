import React, { useEffect } from "react";
import styled from "styled-components";
import PostContent from "./components/PostContent";
import CreateQuestionnaire from "./components/CreateQuestionnaire";
import CommonContainer from "../../components/CommonContainer";

export default function ClubPostScreen() {
  const onSetQuestionList = (list: any) => {
    // console.log("*", list.length);
  };
  const onSetTitle = (title: string) => {
    // console.log("title : ", title);
  };
  const onSetType = (type: string) => {
    // console.log("$", type);
  };
  const onSetContent = (content: string) => {
    // console.log("$#%#$", content);
  };

  return (
    <CommonContainer>
      <SubmitButton>등록</SubmitButton>
      <PostContent
        setTitle={onSetTitle}
        setClubType={onSetType}
        setContent={onSetContent}
      />
      <Line />
      <CreateQuestionnaire setListArr={onSetQuestionList} />
    </CommonContainer>
  );
}

const SubmitButton = styled.button`
  background-color: var(--purple);
  border-radius: 4px;
  padding: 0.625rem 20px;
  color: white;
  font-size: 0.875rem;
  margin-left: auto;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray03);
  margin: 40px 0;
`;
