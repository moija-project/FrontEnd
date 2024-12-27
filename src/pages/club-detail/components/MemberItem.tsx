import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { postDetailState } from '../../../store/postStore';

type MemberItemProps = {
  isLeader?: boolean;
  isMe?: boolean;
  hasReviewed: boolean;
  nickname: string;
  userId: string;
  postId: number;
};

export default function MemberItem({
  isLeader = false,
  isMe = false,
  nickname,
  userId,
  postId,
  hasReviewed,
}: MemberItemProps) {
  const postDetail = useRecoilValue(postDetailState);
  const navigate = useNavigate();
  const moveToCredReview = () => {
    if (isMe) return;
    if (hasReviewed) {
      alert('이미 평가했습니다!');
      return;
    }
    navigate('/credReview', { state: { type: 'peer', peerId: userId, postId } });
  };
  return (
    <Container>
      <RoleIcon>
        {isLeader ? (
          <FontAwesomeIcon icon={faCrown} color="#FFF59F" size="lg" />
        ) : (
          <FontAwesomeIcon icon={faUser} color="#CEA1E7" size="lg" />
        )}
      </RoleIcon>
      <Nickname isMe onClick={() => moveToCredReview()}>
        {nickname}
      </Nickname>
      {!isMe && postDetail.role_in_post === 'L' && <DeleteButton>강퇴</DeleteButton>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  cursor: pointer;
`;
const RoleIcon = styled.div`
  width: 25px;
  margin-right: 0.75rem;
`;
const Nickname = styled.span<{ isMe: boolean }>`
  ${({ isMe }) => !isMe && `cursor: pointer;`}
  margin: 3px 0;
  max-width: 80%;
  font-size: 1.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DeleteButton = styled.button`
  margin-left: auto;
  color: var(--red);
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-position: under;
`;
