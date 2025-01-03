import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { postPostClip, postPostLike } from '../../../api/service-api/clubPostApi';
import { useRecoilState } from 'recoil';
import { postDetailState } from '../../../store/postStore';
import { useNavigate } from 'react-router-dom';

// !!! 로그인했을 때만 클릭 가능하도록!!

type LikeScrapContainerProps = {
  postId: number;
};

export default function LikeScrapContainer({ postId }: LikeScrapContainerProps) {
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useRecoilState(postDetailState);

  const onClickLike = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 먼저 해주세요.');
      navigate('/login');
      return;
    }
    let newDetail = { ...postDetail };
    const vote = postDetail.myliked ? 0 : 1;

    const res = await postPostLike({ vote, post_id: postId });
    if (!res?.isSuccess) return;

    newDetail.likes = vote === 0 ? newDetail.likes - 1 : newDetail.likes + 1;
    newDetail.myliked = !newDetail.myliked;
    setPostDetail(newDetail);
  };
  const onClickScrap = async () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 먼저 해주세요.');
      navigate('/login');
      return;
    }
    let newPostDetail = { ...postDetail };
    const clip = postDetail.mycliped ? 0 : 1;
    const res = await postPostClip({ post_id: postId, clip });
    if (!res?.isSuccess) return;
    newPostDetail.mycliped = !newPostDetail.mycliped;
    setPostDetail(newPostDetail);
  };

  return (
    <Container>
      <ButtonWrapper isChecked={postDetail.myliked} onClick={onClickLike}>
        <FontAwesomeIcon icon={faHeart} color={!postDetail.myliked ? '#DFDFDF' : '#ffffff'} size="2x" />
        <ButtonCnt isChecked={postDetail.myliked}>{postDetail.likes}</ButtonCnt>
      </ButtonWrapper>

      <ButtonWrapper isChecked={postDetail.mycliped} onClick={onClickScrap}>
        <FontAwesomeIcon icon={faStar} color={postDetail.mycliped ? '#ffffff' : '#DFDFDF'} size="2x" />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
`;
const ButtonWrapper = styled.button<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 60px;
  border: 1px solid ${({ isChecked }) => (isChecked ? 'var(--purple)' : 'var(--light-gray03)')};
  background-color: ${({ isChecked }) => (isChecked ? 'var(--purple)' : 'white')};
`;
const ButtonCnt = styled.span<{ isChecked: boolean }>`
  margin-top: 3px;
  color: ${({ isChecked }) => (isChecked ? 'white' : 'var(--purple)')};
  font-size: 0.875rem;
`;
