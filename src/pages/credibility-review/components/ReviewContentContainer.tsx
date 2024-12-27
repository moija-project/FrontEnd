import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionContainer from './QuestionContainer';
import { getPostTitle } from '../../../api/service-api/clubPostApi';
import { getUserProfile } from '../../../api/service-api/profileApi';
import { UserProfileResType } from '../../../interfaces/user-type';
import { Link, useNavigate } from 'react-router-dom';

type ReviewContentContainerProps = {
  setSumScore: (sum: number) => void;
  type: 'peer' | 'club';
  postId: string;
  peerId?: string;
};

const peerReviewList = [
  '1. 해당 모임에서 성실하게 참여했나요?',
  '2. 해당 모임에서 적극적으로 참여했나요?',
  '3. 해당 모임에서 매너 있게 참여했나요?',
  '4. 모임의 목적에 적합한 활동만 했나요?',
  '5. 모임의 내부 규칙을 잘 지켰나요?',
];
const clubReviewList = [
  '1. 해당 모임이 주기적으로 이루어졌나요?',
  '2. 해당 모임이 나의 발전에 도움을 주었나요 ?',
  '3. 해당 모임에서 서로 배려하고 존중하는 분위기였나요?',
  '4. 모임 규칙이 타당했나요?',
  '5. 모임 규칙이 잘 이행되었나요?',
];

export default function ReviewContentContainer({ setSumScore, type, postId, peerId }: ReviewContentContainerProps) {
  const navigate = useNavigate();
  const [scoresList, setScoresList] = useState(Array.from({ length: 5 }, () => 0));
  const [postTitle, setPostTitle] = useState();
  const [peer, setPeer] = useState<UserProfileResType>();
  const handleScore = (score: number, num: number) => {
    const scoresArr = [...scoresList];
    scoresArr[num] = score;
    setScoresList(scoresArr);
  };

  const moveToPost = () => {
    navigate(`/clubDetail/${postId}`);
  };

  useEffect(() => {
    if (scoresList.includes(0)) return;
    const sum = scoresList.reduce((prev, cur) => prev + cur);
    setSumScore(Number(sum.toFixed(1)));
  }, [scoresList]);

  useEffect(() => {
    const getTitle = async () => {
      const res = await getPostTitle(postId);
      setPostTitle(res);
    };
    getTitle();
  }, [postTitle]);

  useEffect(() => {
    if (peerId) {
      const getUserData = async () => {
        const res = await getUserProfile(peerId);
        setPeer(res);
      };
      getUserData();
    }
  }, [peerId]);

  return (
    <Container>
      {type === 'peer' ? (
        <Title>
          <ClubName>
            <Link to={`/clubDetail/${postId}`} target="_blank">
              {postTitle}
            </Link>
          </ClubName>{' '}
          에서
          <br /> {peer?.nickname} 님의 참여 태도를 평가해주세요!
        </Title>
      ) : (
        <Title>
          <ClubName>
            <Link to={`/clubDetail/${postId}`} target="_blank">
              {postTitle}
            </Link>
          </ClubName>{' '}
          에서 잘 활동하셨나요?
          <br /> 모임이 어땠는지 평가해주세요!
        </Title>
      )}
      <ContentContainer>
        {type === 'peer'
          ? peerReviewList.map((q, i) => (
              <QuestionContainer questionText={q} setScore={handleScore} key={`question_${i}`} qustionNum={i} />
            ))
          : clubReviewList.map((q, i) => (
              <QuestionContainer questionText={q} setScore={handleScore} key={`question_${i}`} qustionNum={i} />
            ))}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 2.25rem 0 0;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6rem;
`;
const ClubName = styled.span`
  cursor: pointer;
  color: var(--blue);
`;
const ContentContainer = styled.div`
  margin-top: 3.4rem;
  display: flex;
  flex-direction: column;
`;
