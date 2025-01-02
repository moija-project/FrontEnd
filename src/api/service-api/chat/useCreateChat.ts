import { useRecoilValue } from 'recoil';
import { CreateChatReqType } from '../../../interfaces/chat-type';
import { axiosAuth } from '../../settingAxios';
import { myUserIdState } from '../../../store/userStore';
import { useMutation } from 'react-query';

// 훅으로 만들지 말고 그냥 api 로 만들기

// 1:1 채팅방 생성 기능 (채팅 요청 수락 버튼 누를 시)
const createChatRoom = async (body: CreateChatReqType) => {
  const url = `/message/create/one-to-one`;

  const formData = new FormData();

  //   const userIdBlob = new Blob([body.myUserId], { type: "application/json" });
  formData.append('userId', body.myUserId);

  const json = JSON.stringify(body.chat);
  const jsonBlob = new Blob([json], { type: 'application/json' });
  formData.append('chat', jsonBlob);

  try {
    const res = await axiosAuth.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const useCreateChat = (userId: string, nickname: string, postId: number, postTitle: string) => {
  const myUserId = useRecoilValue(myUserIdState);

  return useMutation({
    mutationFn: () =>
      createChatRoom({
        myUserId,
        chat: { userId, nickname, postId, postTitle },
      }),
    onSuccess: () => console.log('dsfjsadmfsdjfiodsjfaio'),
  });
};
