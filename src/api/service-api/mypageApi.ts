import {
  ReadReceivedAnsResType,
  ReceivedChatRequestType,
} from "../../interfaces/mypage-type";
import { postListResType } from "../../interfaces/post-type";
import { axiosAuth } from "../settingAxios";

// 내가 쓴 글
export const postListIWrote = async (data: {}): Promise<
  postListResType[] | undefined
> => {
  const url = `/my/team/list`;
  try {
    const res = await axiosAuth.post(url, { user_id: "testman1" }); // fix
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 내가 스크랩한 글들
export const postScrapList = async (): Promise<
  postListResType[] | undefined
> => {
  const url = `/my/clip`;
  try {
    const res = await axiosAuth.post(url, { user_id: "testman1" }); // fix
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 받은 요청 (받은 1대1 채팅 요청 )
export const postReceivedChatRequest = async (data: {}): Promise<
  ReceivedChatRequestType[] | undefined
> => {
  const url = `/my/waiting/list`;
  try {
    const res = await axiosAuth.post(url, { user_id: "testman1" }); // fix
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 받은 요청 상세 확인
export const postReceivedChatRequestDetail = async (
  waiting_id: number
): Promise<ReadReceivedAnsResType | undefined> => {
  const url = `/my/waiting/${waiting_id}`;
  try {
    const res = await axiosAuth.post(url);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 받은 요청 수락하기
export const postReceivedChatRequestAccept = async (waiting_id: number) => {
  const url = `/my/accept/${waiting_id}`;
  try {
    const res = await axiosAuth.post(url);
    console.log("받은 요청 수락 api ", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
