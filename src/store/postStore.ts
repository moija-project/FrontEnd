import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";
import {
  getPostDetailParamsType,
  postListParamsType,
  postListResType,
} from "../interfaces/post-type";
import { getPostList } from "../api/service-api/clubPostApi";

export const fetchPostListAtom = selectorFamily({
  key: "fetchPostListState",
  get: (params: postListParamsType) => async () => {
    const data = await getPostList(params);
    return data;
  },
});
