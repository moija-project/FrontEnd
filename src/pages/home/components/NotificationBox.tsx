import styled from 'styled-components';
import { NotifyResType } from '../../../interfaces/mypage-type';
import { Link } from 'react-router-dom';

type NotificationBoxProps = {
  isFirst?: boolean;
  item: NotifyResType;
};

export default function NotificationBox({ isFirst = false, item }: NotificationBoxProps) {
  return (
    <Link to={item.link} style={{ textDecoration: 'none', color: 'black' }}>
      <Container isFirst={isFirst}>
        <IconImage src={require('../../../assets/images/icon-invite.png')} />
        <MessageWrapper>
          <MessageTitle>{item.message}</MessageTitle>
          <MessageContent>자세히 보기</MessageContent>
        </MessageWrapper>
      </Container>
    </Link>
  );
}

const Container = styled.div<{ isFirst: boolean }>`
  padding-top: 0.94rem;
  ${({ isFirst }) => !isFirst && 'border-top: 1px solid var(--light-gray02);'}
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  background-color: white;
  margin-bottom: 0.94rem;
`;
const IconImage = styled.img`
  width: 45px;
  height: 45px;
  /* border-radius: 100%; */
  margin-right: 8px;
`;
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MessageTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 4px;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;
const MessageContent = styled.span`
  width: 100%;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  font-size: 0.8rem;
  color: var(--gray01);
`;
