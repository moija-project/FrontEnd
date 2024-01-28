import {
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
import { axiosAuth } from "../settingAxios";

export const getPostList = async (
  params: postListParamsType
): Promise<postListResType[] | undefined> => {
  const url = `/post/list`;
  try {
    const response = await axiosAuth.get(url, { params });
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
    const res = await axiosAuth.get(url, { params });
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const postPostWrite = async (body: PostWriteReqType) => {
  const url = `/post/write`;
  try {
    const res = await axiosAuth.post(url, body);
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

export const getPostQuestion = async (body: {
  user_id: string;
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
