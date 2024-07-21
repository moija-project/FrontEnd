import { useQuery } from "react-query";
import { PostInfoResultResType } from "../../../interfaces/post-type";
import { axiosAuth } from "../../settingAxios";

const getPostInfo = async (
  postId: number
): Promise<PostInfoResultResType | undefined> => {
  const url = `/post/info/${postId}`;
  try {
    const res = await axiosAuth.get(url);
    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const usePostInfo = (postId: number) => {
  return useQuery({
    queryKey: ["post-info", postId],
    queryFn: () => getPostInfo(postId),
    // enabled: false,
  });
};
