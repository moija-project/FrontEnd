import axios from "axios";
import {
  AnsweringReqType,
  ClubConditionType,
  PostClipReqType,
  PostLikeReqType,
  PostLikeResType,
  PostWriteReqType,
  getPostDetailParamsType,
  postDetailResType,
  postListParamsType,
  postListResType,
} from "../../interfaces/post-type";
import { axiosAuth, axiosUnAuth } from "../settingAxios";

export const getPostList = async (
  params: postListParamsType
): Promise<postListResType[] | undefined> => {
  const url = `/post/list`;
  try {
    const response = await axiosUnAuth.get(url, { params }); // fix?!
    return response.data.result;
  } catch (error) {
    console.error("**ERROR**", error);
  }
};

export const getPostDetail = async (
  params: getPostDetailParamsType
): Promise<postDetailResType | undefined> => {
  const url = `/post/page`;
  try {
    // fix 이거 unauth로 해도되는지 고민!
    const res = await axiosAuth.get(url, { params });
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const postPostWrite = async (body: any) => {
  // export const postPostWrite = async (body: PostWriteReqType) => {
  const url = `/post/write`;
  try {
    const res = await axiosAuth.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postPostLike = async (
  data: PostLikeReqType
): Promise<PostLikeResType | undefined> => {
  const url = `/post/like`;
  try {
    const res = await axiosAuth.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postPostClip = async (
  data: PostClipReqType
): Promise<PostLikeResType | undefined> => {
  const url = `/post/clip`;
  try {
    const res = await axiosAuth.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 게시글 수정
export const patchPost = async (data: PostWriteReqType, post_id: number) => {
  const url = `/post/write/${post_id}`;
  try {
    const res = await axiosAuth.patch(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPostQuestion = async (body: {
  post_id: number;
}): Promise<ClubConditionType[] | undefined> => {
  const url = `/post/question/${body.post_id}`;
  try {
    const res = await axiosAuth.post(url, body);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const deletePostDetail = async (data: {
  user_id: string;
  post_id: number;
}) => {
  const url = `/post/delete/${data.post_id}`;
  try {
    const res = await axiosAuth.delete(url, { data });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postPostBump = async (data: { post_id: number }) => {
  const url = `/post/renew/${data.post_id}`;
  try {
    const res = await axiosAuth.post(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 가입조건 질문에 답하기
export const postAnswering = async (
  data: AnsweringReqType,
  post_id: number
) => {
  const url = `/post/waiting/${post_id}`;
  try {
    const res = await axiosAuth.post(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 모임 재개 / 종료 시키기
export const postChangeClubState = async (
  post_id: number,
  state: "start" | "stop"
) => {
  const url = `/post/${state}/${post_id}`;
  try {
    const res = await axiosAuth.post(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 해당 포스트의 참여 멤버 보기
export const getPostMembers = async (post_id: number) => {
  const url = `/my/member/${post_id}`;
  try {
    const res = await axiosAuth.post(url);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};
