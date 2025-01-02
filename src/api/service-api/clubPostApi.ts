import {
  AnsweringReqType,
  ClubConditionType,
  PostClipReqType,
  PostLikeReqType,
  PostLikeResType,
  getPostDetailParamsType,
  postDetailResType,
  postListParamsType,
  postListResType,
} from '../../interfaces/post-type';
import { axiosAuth, axiosUnAuth } from '../settingAxios';

export const getPostList = async (params: postListParamsType): Promise<postListResType[] | undefined> => {
  const url = `/post/list`;
  try {
    const response = await axiosAuth.get(url, { params }); // fix?!
    return response.data.result;
  } catch (error) {
    console.error('**ERROR**', error);
  }
};

export const getPostDetail = async (params: getPostDetailParamsType): Promise<postDetailResType | undefined> => {
  const url = `/post/page`;
  let res;
  try {
    if (localStorage.getItem('accessToken')) {
      res = await axiosAuth.post(url, null, { params });
    } else {
      res = await axiosUnAuth.get(url, { params });
    }
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const postPostWrite = async (body: any) => {
  const url = `/post/write`;
  try {
    const res = await axiosAuth.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postPostLike = async (data: PostLikeReqType): Promise<PostLikeResType | undefined> => {
  const url = `/post/like`;
  try {
    const res = await axiosAuth.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postPostClip = async (data: PostClipReqType): Promise<PostLikeResType | undefined> => {
  const url = `/post/clip`;
  try {
    const res = await axiosAuth.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 게시글 수정
export const patchPost = async (body: any, post_id: number) => {
  // export const patchPost = async (data: PostWriteReqType, post_id: number) => {
  const url = `/post/write/${post_id}`;
  try {
    // const res = await axiosAuth.patch(url, data);
    const res = await axiosAuth.patch(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPostQuestion = async (body: { post_id: number }): Promise<ClubConditionType[] | undefined> => {
  const url = `/post/question/${body.post_id}`;
  try {
    const res = await axiosAuth.post(url, body);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const deletePostDetail = async (post_id: number) => {
  const url = `/post/delete/${post_id}`;
  try {
    const res = await axiosAuth.delete(url);
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
export const postAnswering = async (data: AnsweringReqType, post_id: number) => {
  const url = `/post/waiting/${post_id}`;
  try {
    const res = await axiosAuth.post(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 모임 재개 / 종료 시키기
export const postChangeClubState = async (post_id: number, state: 'start' | 'stop') => {
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

// 모임 평가하기
export const postReviewClub = async (post_id: number, score: number) => {
  const url = `/post/grant/${post_id}`;
  try {
    const res = await axiosAuth.post(url, { score });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 개인 평가하기
export const postReviewUser = async (score: number, granted: string) => {
  // granted : 평가받는 사람
  const url = `/user/grant`;
  try {
    const res = await axiosAuth.post(url, { score, granted });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// 포스트 이이디로 포스트 제목
export const getPostTitle = async (post_id: string) => {
  const url = `/post/title/${post_id}`;
  try {
    const res = await axiosAuth.get(url);
    return res.data.result.title;
  } catch (error) {
    console.error(error);
  }
};
