import { CreateChatReqType } from '../../../interfaces/chat-type';
import { axiosAuth } from '../../settingAxios';

// 1:1 채팅방 생성 기능 (채팅 요청 수락 버튼 누를 시)
// export const createChatRoom = async (body: CreateChatReqType) => {
export const createChatRoom = async (waitingId: number) => {
  const url = `/my/accept/${waitingId}`;
  // const url = `/message/create/one-to-one`;

  // let formData = new FormData();

  // //   const userIdBlob = new Blob([body.myUserId], { type: "application/json" });
  // formData.append("userId", body.myUserId);

  // const json = JSON.stringify(body.chat);
  // const jsonBlob = new Blob([json], { type: "application/json" });
  // formData.append("chat", jsonBlob);

  try {
    // const res = await axiosAuth.post(url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    const res = await axiosAuth.post(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
