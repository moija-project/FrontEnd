import {
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
  // const url = `/post/list?category=${params.category ?? "all"}&view_type=${
  //   params.view_type ?? "latest"
  // }`;
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
