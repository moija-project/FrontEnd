import { SignupReqType } from "../../interfaces/user-type";
import { axiosAuth } from "../settingAxios";

// 회원가입
export const postSignup = async (data: SignupReqType) => {
  const url = `/user/join`;
  try {
    const res = await axiosAuth.post(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const loginRequest = async (id: string, pw: string) => {
  const requestUrl = "/login";
  // const body = {
  //     user_id
  // }
};
