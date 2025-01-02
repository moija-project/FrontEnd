import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myProfileInfoState } from '../../../store/userStore';

export default function ProfileWrapper() {
  const myProfile = useRecoilValue(myProfileInfoState);

  return (
    <ProfileContainer>
      <ProfileImage
        // src={require("../../../assets/images/default-img-01.png")}
        src={
          !myProfile.photo_profile || myProfile.photo_profile === ''
            ? require('../../../assets/images/default-img-01.png')
            : myProfile.photo_profile
        }
      />
      <ProfileMiddleWraaper>
        <NickName>{myProfile.nickname} 님</NickName>
        <ProfileContent>
          {myProfile.gender} {myProfile.birth_year}
        </ProfileContent>
      </ProfileMiddleWraaper>
      <ProfileRightWrapper>
        <Title>신뢰도 점수</Title>
        <Score>{myProfile.reliability_user}점</Score>
      </ProfileRightWrapper>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const ProfileMiddleWraaper = styled.div`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
`;
const NickName = styled.span`
  font-size: 0.875rem;
  margin-bottom: 8px;
`;
const ProfileContent = styled.span`
  font-size: 0.875rem;
  color: var(--gray01);
`;
const ProfileRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;
const Title = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
  margin-bottom: 6px;
`;
const Score = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
