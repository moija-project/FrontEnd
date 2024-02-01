import { ProfileResType } from "../../interfaces/user-type";
import { axiosAuth } from "../settingAxios";

// 내 프로필 보기
export const postMyProfile = async (data: {}): Promise<
  ProfileResType | undefined
> => {
  const url = `/my/profile`;
  try {
    const res = await axiosAuth.post(url, { user_id: "testman1" }); // fix
    if (!res.data.isSuccess) return;
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

// 내 프로필 사진 수정하기
export const patchMyProfileImg = async (data: { file: File }) => {
  const url = `/my/profile/edit/photo`;
  try {
    const res = await axiosAuth.patch(url, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 내 프로필 닉네임 수정하기
// export const patchMyProfileNickname = async (data: {}) => {};
