import { api } from '../api/api';
import { Paginate } from '../types/paginate';
import { PostResponse } from '../types/post';

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
}
