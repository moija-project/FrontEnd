import { LoginResType, SignupReqType } from "../../interfaces/user-type";
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

// 로그인
export const postLogin = async (
  username: string,
  password: string
): Promise<LoginResType | undefined> => {
  const url = `/user/login`;
  try {
    const res = await axiosAuth.post(url, { username, password });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
