import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PhotoContainer from "./PhotoContainer";
import { useRecoilState } from "recoil";
import { writePostState } from "../../../store/postStore";
import { CategoryType } from "../../../interfaces/post-type";

const TypesArray: { id: CategoryType; name: string }[] = [
  { id: "language", name: "어학" },
  { id: "study", name: "학업" },
  { id: "employ", name: "취업" },
  { id: "hobby", name: "취미 및 소모임" },
  { id: "etc", name: "기타" },
];

export default function PostContent() {
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [type, setType] = useState("all");

  const onChangeTypesRadio = (cate: CategoryType) => {
    let newPost = { ...writePost };
    newPost["category"] = cate;
    setWritePost(newPost);
  };
  const onChangeTitle = (title: string) => {
    let newPost = { ...writePost };
    newPost["title"] = title;
    setWritePost(newPost);
  };
  const onChangeContent = (content: string) => {
    let newPost = { ...writePost };
    newPost["contents"] = content;
    setWritePost(newPost);
  };

  return (
    <Container>
      <form>
        <TitleInput
          value={writePost.title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <TypeContainer>
          <TypeTitle>분야</TypeTitle>
          <TypesWrapper>
            {TypesArray.map((item, index) => (
              <TypeItemWrapper
                key={`type-btn-${index}`}
                isChecked={item.id === writePost.category}
              >
                <TypeItemInput
                  type="radio"
                  value={item.id}
                  id={item.id}
                  checked={writePost.category === item.id}
                  onChange={() => onChangeTypesRadio(item.id)}
                />
                <TypeItemLabel
                  isChecked={item.id === writePost.category}
                  htmlFor={item.id}
                >
                  {item.name}
                </TypeItemLabel>
              </TypeItemWrapper>
            ))}
          </TypesWrapper>
        </TypeContainer>
        <TextArea
          maxLength={2000}
          onChange={(e) => onChangeContent(e.target.value)}
          value={writePost.contents}
        />
        <PhotoContainer />
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const TitleInput = styled.input`
  margin-top: 20px;
  font-size: 20px;
  border: none;
  width: 100%;
  padding: 0.625rem 0;
`;

const TypeContainer = styled.div`
  margin-top: 30px;
`;
const TypeTitle = styled.span`
  font-size: 0.875rem;
  margin-bottom: 7px;
  font-weight: 600;
`;
const TypesWrapper = styled.div`
  margin-top: 0.625rem;
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;
const TypeItemWrapper = styled.div<{ isChecked: boolean }>`
  padding: 6px 0.94rem;
  border-radius: 50px;
  background-color: ${({ isChecked }) =>
    isChecked ? "var(--purple)" : "white"};
  border: ${({ isChecked }) =>
    isChecked ? "1px solid var(--purple)" : "1px solid var(--gray01)"};
`;
const TypeItemInput = styled.input`
  display: none;
`;
const TypeItemLabel = styled.label<{ isChecked: boolean }>`
  cursor: pointer;
  width: 100%;
  color: ${({ isChecked }) => (isChecked ? "white" : "var(--gray01)")};
`;

const TextArea = styled.textarea`
  margin-top: 40px;
  width: 100%;
  height: 400px;
  padding: 20px;
  overflow: scroll;
  background-color: white;
  border-radius: 4px;
  border: 1px solid var(--light-gray03);
  font-weight: 500;
  font-size: 1.125rem;
`;
