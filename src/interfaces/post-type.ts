// 카테고리 타입
export type CategoryType =
  | "all"
  | "language"
  | "hobby"
  | "study"
  | "employ"
  | "etc";

// 보기 순 타입
export type ViewType = "latest" | "most_view" | "most_like";

// 모임 가입 조건 질문
export type ClubConditionType = {
  question: string;
  answer: string | null;
};

// 모임 게시물 글쓰기
export type PostWriteReqType = {
  title: string;
  contents: string;
  category: CategoryType;
  leader_id: string;
  num_condition: number;
  is_changed: boolean;
  penalty: number;
  conditions: ClubConditionType[];
};

export type PostWriterProfileType = {
  born_in: string;
  leader_nickname: string;
  profile_photo: string | null;
  reliability_user: number;
  userNickname: string;
  user_id: string;
};

export type postListParamsType = {
  category: CategoryType;
  view_type: ViewType;
};
export type getPostDetailParamsType = {
  post_id: number;
};

export type postListResType = {
  contents: string;
  latest_write: string;
  leader_nickname: string;
  likes: number;
  post_id: number;
  state_recruit: boolean;
  title: string;
  views: number;
};

export type postDetailResType = PostWriterProfileType & {
  // title: string;
  // contents: string;
  // penalty: number;
  // likes: number;
  // views: number;
  // changed: boolean;
  // state_recruit: boolean;
  // leader_nickname: string;
  // latest_write: string;
  // is_changed: false;
  // reliability_recruit: number;
  // pictures: string[];
  // myliked: boolean;
  // mycliped: boolean;
  // user_nickname: string;
  // user_id: string;
  // born_in: string;
  // reliability_user: number;
  // profile_photo: string;
  is_changed: boolean;
  contents: string;
  latest_write: string;
  likes: number;
  mycliped: boolean;
  myliked: boolean;
  penalty: number;
  pictures: string[] | null;
  reliability_recruit: number;
  state_recruit: boolean;
  title: string;
  views: number;
};

export type PostLikeReqType = {
  post_id: number;
  vote: number;
};
export type PostClipReqType = {
  post_id: number;
  clip: number;
};
export type PostLikeResType = {
  isSuccess: boolean;
  code: number;
  message: string;
};
// export type PostClipResType = {
//   isSuccess : boolean ,
//   code : number ,
//   message : string
// }
