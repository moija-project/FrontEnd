import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import {
  ClubConditionType,
  FilterListType,
  PostWriteReqType,
  getPostDetailParamsType,
  postDetailResType,
  postListParamsType,
  postListResType,
} from '../interfaces/post-type';
import { getPostDetail, getPostList } from '../api/service-api/clubPostApi';

export const writePostState = atom<PostWriteReqType>({
  key: 'writePostState',
  default: {
    title: '',
    contents: '',
    category: 'etc',
    // leader_id: "testman1", // fix
    num_condition: 0,
    is_changed: false,
    penalty: 0,
    conditions: [],
  },
});
export const postDetailState = atom<postDetailResType>({
  key: 'postDetailState',
  default: {
    title: '',
    contents: '',
    penalty: 0,
    likes: 0,
    views: 0,
    state_recruit: true,
    leader_nickname: '',
    latest_write: '',
    is_changed: false,
    reliability_recruit: 0,
    pictures: [],
    myliked: false,
    mycliped: false,
    userNickname: '',
    leader_id: '',
    born_in: '',
    reliability_user: 0,
    profile_photo: '',
    num_condition: 0,
    last_write: '',
    first_write: '',
    changed: false,
    category: 'etc',
    gender: '',
    role_in_post: 'V',
  },
});

export const fetchPostDetailAtom = selectorFamily({
  key: 'fetchPostDetailState',
  get: (param: getPostDetailParamsType) => async () => {
    const data = await getPostDetail(param);
    return data;
  },
});

export const fetchPostListState = atom<postListResType[]>({
  key: 'fetchPostListState',
  default: [],
});

export const fetchPostListAtom = selectorFamily({
  key: 'fetchPostListState',
  get: (params: postListParamsType) => async () => {
    const data = await getPostList(params);
    return data;
  },
});

// 가입 조건 질문에 대한 답변
export const postQuestionAnswerState = atom<ClubConditionType[] | null>({
  key: 'postQuestionAnswerState',
  default: null,
});

// 해당 게시물에 대한 가입조건 질문만
export const postDetailQuestions = atom<ClubConditionType[] | null | []>({
  key: 'postDetailQuestions',
  default: [],
});

// 게시글 글쓰기 - 사진 보내기
export const postPhotoState = atom<any[]>({
  key: 'postPhotoState',
  default: [],
});
