export type ProfileType = {
  profile_img: string | null;
  nickname: string;
  gender: string;
  birth_year: number;
  reliability_user: number;
};

// 프로필 조회 응답 타입
export type ProfileResType = {
  user_id: string;
  nickname: string;
  birth_year: string;
  reliability_user: number;
  photo_profile: string;
  gender: string;
};

export type UserProfileResType = ProfileResType & {
  my_grant : any
}

// 회원가입
export type SignupReqType = {
  user_id: string;
  password: string;
  name: string;
  nickname: string;
  gender: number; // 1:femail 0:male
  birth: string;
  phone_number: string;
  email: string;
};

// 로그인
export type LoginResType = {
  isSuccess: boolean;
  code: number;
  message: string;
  result?: LoginResResultType;
};
export type LoginResResultType = {
  grantType: string;
  accessToken: string;
  // refreshToken: string;
};
