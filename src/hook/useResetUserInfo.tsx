import { useResetRecoilState } from 'recoil';
import { myProfileInfoState, myUserIdState } from '../store/userStore';
import {
  fetchMyHostListState,
  fetchMyJoinListState,
  fetchMyScrapListState,
  fetchRequestListState,
} from '../store/mypageStore';

export const useResetUserInfo = () => {
  const resetMyProfile = useResetRecoilState(myProfileInfoState);
  const resetMyId = useResetRecoilState(myUserIdState);

  const resetRequestList = useResetRecoilState(fetchRequestListState);
  const resetMyHostList = useResetRecoilState(fetchMyHostListState);
  const resetMyJoinList = useResetRecoilState(fetchMyJoinListState);
  const resetMyScrapList = useResetRecoilState(fetchMyScrapListState);

  return () => {
    resetMyProfile();
    resetMyId();
    resetRequestList();
    resetMyHostList();
    resetMyJoinList();
    resetMyScrapList();
  };
};
