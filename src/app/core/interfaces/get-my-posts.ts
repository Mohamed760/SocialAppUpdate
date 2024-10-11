export interface GetMyPosts {
  message: string;
  paginationInfo: PaginationInfo;
  posts: any[];
}

export interface PaginationInfo {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  total: number;
}