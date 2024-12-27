import styled from 'styled-components';
import PreviewChatRequest from '../../../components/PreviewChatRequest';
import { useRecoilValue } from 'recoil';
import { fetchRequestListState } from '../../../store/mypageStore';

export default function ChatRequestListContainer() {
  const list = useRecoilValue(fetchRequestListState);

  return (
    <Container>
      <RequestContainer>
        <Title>받은 요청</Title>
        <MessageList>
          {!list.map((v) => v.type === 'received').length && <NoneText>받은 요청이 없어요</NoneText>}
          {list.map(
            (item, idx) =>
              item.type === 'received' && <PreviewChatRequest key={`received-request-msg-${idx}`} data={item} />,
          )}
        </MessageList>
      </RequestContainer>
      <Line />
      <RequestContainer>
        <Title>보낸 요청</Title>
        <MessageList>
          {!list.map((v) => v.type === 'sent').length && <NoneText>보낸 요청이 없어요</NoneText>}
          {list.map(
            (item, idx) => item.type === 'sent' && <PreviewChatRequest key={`sent-request-msg-${idx}`} data={item} />,
          )}
        </MessageList>
      </RequestContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.9rem;
`;

const Line = styled.div`
  height: 100%;
  width: 1px;
  background-color: var(--light-gray03);
`;
const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MessageItem = styled.div`
  cursor: pointer;
  border: 1px solid var(--purple);
  padding: 0.35rem 0.5rem;
  font-size: 1rem;
  width: 100%;
`;
const NoneText = styled.span`
  color: var(--gray01);
  margin-top: 1rem;
`;
