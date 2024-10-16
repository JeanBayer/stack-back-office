import { api } from '@tabla-compleja/api';
import {
  ActionMode,
  Filter,
  Paginate,
  PostResponse,
  Status,
} from '@tabla-compleja/types';

type GetPosts = {
  page: Paginate['page'];
  perPage: Paginate['perPage'];
  filter: Partial<Filter>;
};

export class PostService {
  public static async getPosts({
    page,
    perPage,
    filter,
  }: GetPosts): Promise<PostResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('perPage', perPage.toString());

      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await api.get<PostResponse>(
        `/items?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error in getPosts method', error);
      throw error;
    }
  }

  public static async deletePost(postId: string): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      throw new Error('Error en deletePost');
      await api.delete(`/items/${postId}`);
    } catch (error) {
      console.error('Error in deletePost method', error);
      throw error;
    }
  }

  public static async getStatus(): Promise<Status[]> {
    try {
      const { data } = await api.get<Status[]>(`/status`);
      return [{ key: '', label: 'Todos' }, ...(data || [])];
    } catch (error) {
      console.error('Error in getStatus method', error);
      throw error;
    }
  }

  public static async changePostStatus(
    postsId: string[],
    status: ActionMode,
  ): Promise<void> {
    try {
      await api.patch<PostResponse>(`/status/${status}`, {
        itemIds: postsId,
      });
    } catch (error) {
      console.error('Error in changePostStatus method', error);
      throw error;
    }
  }
}
