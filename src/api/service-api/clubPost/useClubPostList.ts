import { useInfiniteQuery } from 'react-query';
import { getPostList } from '../clubPostApi';
import { postListParamsType } from '../../../interfaces/post-type';

export const useClubPostList = (params: postListParamsType) => {
  return useInfiniteQuery({
    // queryKey: [
    //   "club-post",
    //   params.category,
    //   params.view_type,
    //   `${params.search_type}-${params.keyword}`,
    //   `club-post_${params.page}`,
    // ],
    queryKey: [
      'club-post',
      {
        category: params.category,
        view_type: params.view_type,
        search_type: params.search_type,
        keyword: params.keyword,
        page: params.page,
      },
    ],
    queryFn: ({ pageParam = 0 }) => getPostList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return null;
      return allPages.length;
    },
    // refetchOnWindowFocus: false,
  });
};
