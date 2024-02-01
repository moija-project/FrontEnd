import { atom } from "recoil";
import { MyProfileType } from "../interfaces/user-type";

// 본인 프로필
export const myProfileInfoState = atom<MyProfileType>({
  key: "myProfileInfoState",
  // 로그인 하면 이 setState 해서 바꾸기!!!! fix
  default: {
    user_id: "testman1", // fix
    profilePhotoUrl:
      "http://resource.mo.ija.kro.kr/테스트맨1_profile.jpg?Expires=9223372036854775&KeyName=real-key&Signature=Mi6BDVekMq6w0R4uRN1KpIHSxg4=",
    nickname: "테스트맨1",
    gender: "여",
    bornIn: "01년생",
    reliabilityUser: 2.5,
  },
});
