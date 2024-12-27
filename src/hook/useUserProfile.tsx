import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myProfileInfoState } from '../store/userStore';
import { postMyProfile } from '../api/service-api/profileApi';
import { useResetUserInfo } from './useResetUserInfo';

type useUserProfileType = {
  isLogout?: boolean;
};

export default function useUserProfile({ isLogout = true }: useUserProfileType) {
  const [userProfile, setUserProfile] = useRecoilState(myProfileInfoState);
  const reset = useResetUserInfo();
  const fetchProfile = async () => {
    const res = await postMyProfile({});
    setUserProfile(res ?? userProfile);
  };
  useEffect(() => {
    if (!isLogout) {
      fetchProfile();
    } else reset();
  }, []);
  return userProfile;
}
