import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { myProfileInfoState } from "../store/userStore";
import { postMyProfile } from "../api/service-api/profileApi";

type useUserProfileType = {
  isLogout?: boolean;
};

export default function useUserProfile({
  isLogout = true,
}: useUserProfileType) {
  const [userProfile, setUserProfile] = useRecoilState(myProfileInfoState);
  const fetchProfile = async () => {
    const res = await postMyProfile({});
    setUserProfile(res ?? userProfile);
  };
  useEffect(() => {
    if (!isLogout) {
      fetchProfile();
    } else
      setUserProfile({
        user_id: "",
        nickname: "",
        birth_year: "",
        photo_profile: "",
        reliability_user: 0,
        gender: "",
      });
  }, []);
  return userProfile;
}
