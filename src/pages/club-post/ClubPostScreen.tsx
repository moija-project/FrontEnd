import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostContent from "./components/PostContent";
import CreateQuestionnaire from "./components/CreateQuestionnaire";
import CommonContainer from "../../components/CommonContainer";
import { postPhotoState, writePostState } from "../../store/postStore";
import { useRecoilState } from "recoil";
import { postPostWrite } from "../../api/service-api/clubPostApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function ClubPostScreen() {
  const navigate = useNavigate();
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [postImg, setPostImg] = useRecoilState(postPhotoState);
  const onSetQuestionList = (list: any) => {
    setWritePost((prev) => {
      return {
        ...prev,
        num_condition: list.length,
        conditions: [
          ...list.map((question: string) => ({ question, answer: null })),
        ],
      };
    });
  };

  const handleSubmit = () => {
    const postClub = async () => {
      let formData = new FormData();
      const json = JSON.stringify(writePost);
      const blob = new Blob([json], { type: "application/json" });

      formData.append("write", blob);
      postImg.length !== 0 &&
        postImg.forEach((img) => {
          formData.append("image", img);
        });

      const res = await postPostWrite(formData);
      console.log(res);
      if (res?.data.isSuccess) {
        setWritePost({
          title: "",
          contents: "",
          category: "etc",
          num_condition: 0,
          is_changed: false,
          penalty: 0,
          conditions: [],
        });
        navigate("/clubList");
      }
      // 요청 성공 시 ui 보여지게
    };
    if (window.confirm("게시물을 등록하시겠습니까?")) {
      postClub();
    }
  };
  const preventClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const preventGoBack = () => {
    window.history.pushState(null, "", window.location.href);
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      setWritePost({
        title: "",
        contents: "",
        category: "etc",
        // leader_id: "testman1", // fix
        num_condition: 0,
        is_changed: false,
        penalty: 0,
        conditions: [],
      });
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      // handleCloseDrawer();
    };
  }, []);

  return (
    <CommonContainer>
      <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      <PostContent />
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
