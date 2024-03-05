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

// 게시물 리스트 검색&필터링 (카테고리, 보기순서, 검색어)
export type FilterListType = {
  searchKeyword: string;
  category: CategoryType;
  view: ViewType;
};

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
  // leader_id: string;
  num_condition: number;
  is_changed: boolean;
  penalty: number;
  conditions: ClubConditionType[];
};
/*
 {
	"title": "테스트 페이지 ??모임 구함",
	"contents": "안녕하세요 저희는 누구고 토익 어디서 악기연주를 할 모임을 어쩌구 해서 모든 내용(2000자까지 가능)",
    "category": "hobby",
	"leader_id": "testman1",
	"num_condition": 2,
    "penalty": 0,
	"is_changed": false,
	"conditions": [
	{
		"question": "당신의 포지션은요?",
		"answer": null
	},
	{
		"question": "당신의 경력은요?",
		"answer": null
	}]
}
 */
export type PostWriterProfileType = {
  born_in: string;
  leader_nickname: string;
  profile_photo: string | null;
  reliability_user: number;
  userNickname: string;
  user_id: string;
  gender: string;
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
  category: Exclude<CategoryType, "all">;
  changed: boolean;
  last_write: string;
  first_write: string;
  num_condition: number;
  role_in_post: "V" | "L" | "M" | "T"; // viewer, leader, member , temp(요청만 보낸상태)
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
export type AnsweringReqType = {
  num_answer: number;
  is_ask: boolean;
  answers: string[] | [];
};
