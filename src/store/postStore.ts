import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";
import {
  ClubConditionType,
  PostWriteReqType,
  getPostDetailParamsType,
  postDetailResType,
  postListParamsType,
  postListResType,
} from "../interfaces/post-type";
import { getPostDetail, getPostList } from "../api/service-api/clubPostApi";

export const writePostState = atom<PostWriteReqType>({
  key: "writePostState",
  default: {
    title: "",
    contents: "",
    category: "etc",
    leader_id: "testman1", // fix
    num_condition: 0,
    is_changed: false,
    penalty: 0,
    conditions: [],
  },
});
export const postDetailState = atom<postDetailResType>({
  key: "postDetailState",
  // default: 0,
  default: {
    title: "",
    contents: "",
    penalty: 0,
    likes: 0,
    views: 0,
    state_recruit: true,
    leader_nickname: "",
    latest_write: "",
    is_changed: false,
    reliability_recruit: 0,
    pictures: [],
    myliked: false,
    mycliped: false,
    userNickname: "",
    user_id: "",
    born_in: "",
    reliability_user: 0,
    profile_photo: "",
  },
});

export const fetchPostDetailAtom = selectorFamily({
  key: "fetchPostDetailState",
  get: (param: getPostDetailParamsType) => async () => {
    const data = await getPostDetail(param);
    return data;
  },
});

export const fetchPostListAtom = selectorFamily({
  key: "fetchPostListState",
  get: (params: postListParamsType) => async () => {
    const data = await getPostList(params);
    return data;
  },
});

// 가입 조건 질문에 대한 답변
export const postQuestionAnswerState = atom<ClubConditionType[] | null>({
  key: "postQuestionAnswerState",
  default: null,
});
