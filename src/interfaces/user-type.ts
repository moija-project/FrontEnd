export type ProfileType = {
  profile_img: string | null;
  nickname: string;
  gender: string;
  birth_year: number;
  reliability_user: number;
};

// 프로필 조회 응답 타입
export type ProfileResType = {
  nickname: string;
  bornIn: string;
  reliabilityUser: number;
  profilePhotoUrl: string;
  gender: string;
};

export type MyProfileType = ProfileResType & {
  user_id: string;
};
