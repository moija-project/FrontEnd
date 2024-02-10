import { atom, selector } from "recoil";
import { MyProfileType } from "../interfaces/user-type";
import { recoilPersist } from "recoil-persist";

// recoil - persist
const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

// 로그인 여부
export const isLoggedInState = atom<Boolean>({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// Access Token
export const accessTokenState = atom<string>({
  key: "accessTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 액세스 토큰 상태를 가져오는 Selector
export const getAccessTokenState = selector({
  key: "getAccessTokenState", // 고유한 키
  get: ({ get }) => {
    return get(accessTokenState); // Atom에서 액세스 토큰 상태를 가져옴
  },
});

// 본인 프로필
export const myProfileInfoState = atom<MyProfileType>({
  key: "myProfileInfoState",
  // 로그인 하면 이 setState 해서 바꾸기!!!! fix
  default: {
    user_id: "testman1", // fix
    profilePhotoUrl:
      "https://i.pinimg.com/564x/0f/3a/f0/0f3af0afcdc7865344e24c0744f1ad0d.jpg",
    nickname: "테스트맨1",
    gender: "여",
    bornIn: "01년생",
    reliabilityUser: 2.5,
  },
  effects_UNSTABLE: [persistAtom],
});
