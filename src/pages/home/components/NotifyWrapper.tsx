import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotificationBox from './NotificationBox';
import { useRecoilValue } from 'recoil';
import { myUserIdState } from '../../../store/userStore';
import SockJS from 'sockjs-client';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { NotifyResType } from '../../../interfaces/mypage-type';

const ex = [
  {
    pushId: '1',
    messasge: '메시지에요메시지에요메시지에요메시지에요메시지에요메시지에요메시지에요메시지에요메시지에요메시지에요',
    nonRead: true,
    pushType: 1,
    pubDate: '',
    link: 'http://front.mo.ija.kro.kr/clubList',
  },
];

export const NotifyWrapper = () => {
  const [stompClient, setStompClient] = useState<CompatClient>();

  const [notify, setNotify] = useState<NotifyResType[] | []>([]);
  const userID = useRecoilValue(myUserIdState);

  useEffect(() => {
    if (userID.length === 0) return;
    const sock = new SockJS(`/stomp/chat`);
    const stompClient = Stomp.over(sock);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/exchange/notify.exchange/user.${userID}`, (message: IMessage) => {
        const parsedBody = JSON.parse(message.body);
        setNotify([parsedBody, ...notify]);
      });
    });
    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userID]);

  return (
    <div style={{ margin: 18 }}>
      <RightTitle>알림</RightTitle>
      {notify && notify.length !== 0 ? (
        notify.map((v, i) => <NotificationBox isFirst={i === 0} item={v} />)
      ) : (
        <NoNotificationMsg>알림이 없어요</NoNotificationMsg>
      )}
    </div>
  );
};

const RightTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 40px;
`;
const NoNotificationMsg = styled.span`
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray01);
`;
