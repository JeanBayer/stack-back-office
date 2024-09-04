import { api } from '../api/api';
import { Paginate } from '../types/paginate';
import { Post, PostResponse } from '../types/post';

export class PostService {
  public static async getPosts({
    page,
    perPage,
  }: Paginate): Promise<PostResponse> {
    try {
      const response = await api.get<PostResponse>(
        `/posts?_page=${page}&_per_page=${perPage}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  public static async getPostById(postId: string): Promise<Post> {
    try {
      const response = await api.get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error;
    }
  }
}
