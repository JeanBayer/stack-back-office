import { api } from '@/api';
import {
  type Paginate,
  type Post,
  type PostResponse,
  PostSchema,
} from '@/types';
import { ObjectUtil } from '@/utils';

export class PostService {
  public static async getPosts({
    page,
    perPage,
  }: Paginate): Promise<PostResponse> {
    try {
      const response = await api.get<PostResponse>(
        `/items?page=${page}&perPage=${perPage}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error in getPosts method', error);
      throw error;
    }
  }

  public static async getPostById(postId: string): Promise<Post> {
    try {
      const response = await api.get<Post>(`/items/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getPostById method', error);
      throw error;
    }
  }

  public static async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const validPost = PostSchema.parse(post);
      const postFormData = ObjectUtil.toFormData(validPost);
      const response = await api.post<Post>('/items', postFormData);
      return response.data;
    } catch (error) {
      console.error('Error in createPost method', error);
      throw error;
    }
  }

  public static async updatePost(post: Partial<Post>): Promise<Post> {
    try {
      const { id, ...restPost } = post;
      const validPost = PostSchema.partial().parse(restPost);
      const postFormData = ObjectUtil.toFormData(validPost);
      const response = await api.patch<Post>(`/items/${id}`, postFormData);
      return response.data;
    } catch (error) {
      console.error('Error in updatePost method', error);
      throw error;
    }
  }

  public static async deletePost(postId: string): Promise<void> {
    try {
      await api.delete(`/items/${postId}`);
    } catch (error) {
      console.error('Error in deletePost method', error);
      throw error;
    }
  }
}
