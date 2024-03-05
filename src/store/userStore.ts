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
  effects: [
    ({ setSelf, onSet }) => {
      const data = localStorage.getItem("accessToken");
      // setSelf: atom 값을 설정 혹은 재설정
      if (data) setSelf(true);
      else setSelf(false);

      // onSet : atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
    },
  ],
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

// 로그인한 유저의 아이디 (이건 아마 임시로 할듯) // fix
export const myUserIdState = atom<string>({
  key: "myUserIdState",
  default: "",
});

// 본인 프로필
export const myProfileInfoState = atom<MyProfileType>({
  key: "myProfileInfoState",
  // 로그인 하면 이 setState 해서 바꾸기!!!! fix
  default: {
    user_id: "", // fix
    photo_profile: "",
    nickname: "",
    gender: "",
    birth_year: "",
    reliability_user: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
