const BASE_URL = "https://jsonplaceholder.typicode.com/";
export const placeholderUrls = {
  root: BASE_URL,
  users: () => `${BASE_URL}/users`,
  userById: (id: string) => `${BASE_URL}/users/${id}`,
  posts: () => `${BASE_URL}/posts`,
  postId: (id: string) => `${BASE_URL}/posts/${id}`,
  postComments: (id: string) => `${BASE_URL}/posts/${id}/comments`,
};
