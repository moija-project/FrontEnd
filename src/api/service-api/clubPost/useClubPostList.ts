import { getPostList } from '../clubPostApi';
import { postListParamsType } from '../../../interfaces/post-type';
import { useInfiniteQuery } from 'react-query';

export const useClubPostList = (params: postListParamsType) => {
  return useInfiniteQuery({
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
    //   getNextPageParam: (lastPage, allPosts) => {
    //     return lastPage.page !== allPosts[0].totalPage ? lastPage.page + 1 : undefined;
    // },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      const totalPages = 1; // fix
      const currentPage = allPages.length;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};
