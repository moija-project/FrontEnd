export type postListParamsType = {
  category: "all" | "hobby" | "language";
  view_type: "latest";
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

export type postDetailResType = {
  title: string;
  contents: string;
  penalty: number;
  likes: number;
  views: number;
  changed: boolean;
  state_recruit: boolean;
  leader_nickname: string;
  latest_write: string;
  is_changed: false;
  reliability_recruit: number;
};
