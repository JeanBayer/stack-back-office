import { api } from '@form-dinamico-back/api';
import { ObjectUtil } from '@form-dinamico-back/utils';
import { PostMisione } from '../types/formTypes';
import { MisionModuleSchema } from '@form-dinamico-back/types';

export class MisionesService {
  public static async getMisiones() {
    try {
      const response = await api.get('/missions');
      return response.data;
    } catch (error) {
      console.error('Error in getMisiones method', error);
      throw error;
    }
  }

  public static async createMission(data: Omit<PostMisione, 'id'>): Promise<PostMisione> {
    try {
      const validPost = MisionModuleSchema.parse(data);
      const postFormData = ObjectUtil.toFormData(validPost);
      const response = await api.post<PostMisione>('missions', postFormData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la misión:', error);
      throw error;
    }
  }

  public static async getMissionById(postId: string): Promise<PostMisione> {
    try {
      const response = await api.get<PostMisione>(`/missions/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getMissionById method', error);
      throw error;
    }
  }

  public static async updateMission(mision: PostMisione): Promise<PostMisione> {
    try {
      const { id, ...restMision } = mision;
      const validPost = MisionModuleSchema.parse(restMision);
      const postFormData = ObjectUtil.toFormData(validPost);
      const response = await api.patch<PostMisione>(`/missions/${id}`, postFormData);
      return response.data;
    } catch (error) {
      console.error('Error in updateMission method', error);
      throw error;
    }
  }

  public static async deleteMission(id: string): Promise<void> {
    try {
      await api.delete(`/missions/${id}`);
    } catch (error) {
      console.error('Error in deleteMission method', error);
      throw error;
    }
  }
}

