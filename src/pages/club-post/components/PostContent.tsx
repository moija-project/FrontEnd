import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PhotoContainer from "./PhotoContainer";

type PostContentProps = {
  setClubType: (type: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
};

const TypesArray = [
  { id: "language", name: "어학" },
  { id: "study", name: "학업" },
  { id: "job", name: "취업" },
  { id: "hobby", name: "취미 및 소모임" },
  { id: "etc", name: "기타" },
];

export default function PostContent({
  setTitle,
  setClubType,
  setContent,
}: PostContentProps) {
  const [type, setType] = useState("all");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const onChangeTypesRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };
  const onChangeTitle = (title: string) => {
    setPostTitle(title);
  };
  const onChangeContent = (content: string) => {
    setPostContent(content);
  };

  useEffect(() => {
    setTitle(postTitle);
  }, [postTitle]);
  useEffect(() => {
    setClubType(type);
  }, [type]);
  useEffect(() => {
    setContent(postContent);
  }, [postContent]);
  return (
    <Container>
      <form>
        <TitleInput
          value={postTitle}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <TypeContainer>
          <TypeTitle>분야</TypeTitle>
          <TypesWrapper>
            {TypesArray.map((item, index) => (
              <TypeItemWrapper isChecked={item.id === type}>
                <TypeItemInput
                  type="radio"
                  value={item.id}
                  id={item.id}
                  checked={type === item.id}
                  onChange={onChangeTypesRadio}
                />
                <TypeItemLabel isChecked={item.id === type} htmlFor={item.id}>
                  {item.name}
                </TypeItemLabel>
              </TypeItemWrapper>
            ))}
          </TypesWrapper>
        </TypeContainer>
        <TextArea
          onChange={(e) => onChangeContent(e.target.value)}
          value={postContent}
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
  padding: 10px 0;
`;

const TypeContainer = styled.div`
  margin-top: 30px;
`;
const TypeTitle = styled.span`
  font-size: 14px;
  margin-bottom: 7px;
  font-weight: 600;
`;
const TypesWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const TypeItemWrapper = styled.div<{ isChecked: boolean }>`
  padding: 6px 15px;
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
  font-size: 16px;
`;
