import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberItem from './MemberItem';
import { getPostMembers, postPostBump } from '../../../api/service-api/clubPostApi';
import { useRecoilValue } from 'recoil';
import { postDetailState } from '../../../store/postStore';
import { hasPassed } from '../../../utils/datetime';
import { MembersResType } from '../../../interfaces/post-type';
import { myProfileInfoState } from '../../../store/userStore';

type ClubManageContainer = {
  postId: number;
};

export default function ClubManageContainer({ postId }: ClubManageContainer) {
  const postDetail = useRecoilValue(postDetailState);
  const myProfile = useRecoilValue(myProfileInfoState);
  const [isActiveBumpBtn, setIsActiveBumpBtn] = useState(false);
  const [members, setMembers] = useState<MembersResType[]>([]);
  const handleBump = async () => {
    const res = await postPostBump({ post_id: postId });
    if (res?.data.isSuccess) setIsActiveBumpBtn(false);
    return res;
  };

  useEffect(() => {
    setIsActiveBumpBtn(hasPassed(postDetail.latest_write));

    const getMembers = async () => {
      const res = await getPostMembers(postId);
      console.log('상세페이지 - 멤버들 보기 : ', res);
      setMembers(res);
    };
    getMembers();
  }, [postDetail]);

  return (
    <Container>
      {postDetail.role_in_post === 'L' && isActiveBumpBtn && (
        <Button isActivated onClick={handleBump}>
          모집글 끌어올리기
        </Button>
      )}
      {postDetail.role_in_post === 'L' && !isActiveBumpBtn && (
        <Button isActivated={false} disabled>
          30시간 지난 후에 끌올이 가능해요
        </Button>
      )}

      <BoxContainer>
        <HeaderWrapper>
          <HeaderTitle>모집 인원</HeaderTitle>
          <PeopleCnt>총 {members?.length ?? 0}명</PeopleCnt>
        </HeaderWrapper>
        <InstructionText>멤버의 개인 평가를 하고 싶으면 멤버 닉네임을 클릭해보세요</InstructionText>
        <MemberListWrapper>
          {members?.length &&
            members.map((member, i) => (
              <MemberItem
                hasReviewed={member.grant}
                isLeader={i === 0}
                isMe={member.user_id === myProfile.user_id}
                nickname={member.nickname}
                userId={member.user_id}
                postId={postId}
              />
            ))}
        </MemberListWrapper>
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button<{ isActivated: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding: 11px;
  ${({ isActivated }) => !isActivated && 'pointer-events: none;'}
  background-color: ${({ isActivated }) => (isActivated ? 'var(--purple)' : 'var(--gray01)')};
  font-size: 1.125rem;
  margin-bottom: 20px;
`;

const BoxContainer = styled.div`
  width: 100%;
  max-height: 580px;
  overflow-y: scroll;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid var(--purple);
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;
const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-right: 6px;
`;
const PeopleCnt = styled.span`
  font-size: 0.75rem;
  color: var(--gray01);
`;
const InstructionText = styled.span`
  color: var(--gray01);
  font-size: 0.75rem;
`;
const MemberListWrapper = styled.div`
  margin-bottom: 0.625rem;
  margin-top: 30px;
`;
const NoMemberText = styled.span`
  font-size: 0.875rem;
  color: var(--gray01);
  text-align: center;
`;
