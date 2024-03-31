import { ProfileResType, UserProfileResType } from "../../interfaces/user-type";
import { axiosAuth } from "../settingAxios";

// 내 프로필 보기
export const postMyProfile = async (data: {}): Promise<
  ProfileResType | undefined
> => {
  const url = `/my/profile`;
  try {
    const res = await axiosAuth.post(url); // fix
    if (!res.data.isSuccess) return;
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 내 프로필 사진 수정하기
export const patchMyProfileImg = async (body: any) => {
  // export const patchMyProfileImg = async (data: { file: File }) => {
  const url = `/my/profile/edit/photo`;
  try {
    const res = await axiosAuth.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 내 프로필 닉네임 수정하기
export const patchMyProfileNickname = async (new_nickname: string) => {
  const url = `/my/profile/edit/nick`;
  try {
    const res = await axiosAuth.patch(url, { new_nickname: new_nickname });
    // const res = await axiosAuth.patch(url, {new_nickname});
    return res;
  } catch (error) {
    console.error(error);
  }
};

// userId 로 유저 프로필 조회
export const getUserProfile = async (
  user_id: string
): Promise<UserProfileResType | undefined> => {
  const url = `/user/profile`;
  try {
    const res = await axiosAuth.post(url, { user_id });
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};
