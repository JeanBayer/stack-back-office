import { Filter } from '@form-dinamico-back/types';
import { Constants } from '@form-dinamico-back/utils';
import { create } from 'zustand';

interface PaginationState {
  page: number;
  perPage: number;
  previousPage: number;
  selectedPostId: string | null;
  filterPost: Filter;
  setFilterPost: (filterPost: Partial<Filter>) => void;
  setPage: (page: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setPerPage: (perPage: number) => void;
  selectPostId: (postId: string) => void;
  clearSelectedPostId: () => void;
}

export const useStore = create<PaginationState>((set) => ({
  page: 1,
  perPage: Constants.PER_PAGE_GET_LIST_POST,
  previousPage: 1,
  selectedPostId: null,
  filterPost: {
    estado: '',
    title: '',
  },

  setPage: (page) =>
    set((state) => {
      if (state.page !== page) {
        return { page, previousPage: state.page };
      }
      return state;
    }),

  setFilterPost: (partialFilter) =>
    set((state) => ({
      filterPost: { ...state.filterPost, ...partialFilter },
    })),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),
  setPerPage: (perPage) => set({ perPage }),
  selectPostId: (postId) => set({ selectedPostId: postId }),
  clearSelectedPostId: () => set({ selectedPostId: null }),
}));
