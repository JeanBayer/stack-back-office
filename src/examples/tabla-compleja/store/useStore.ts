import { Filter } from '@tabla-compleja/types';
import { Constants } from '@tabla-compleja/utils';
import { create } from 'zustand';

interface PaginationState {
  page: number;
  perPage: number;
  previousPage: number;
  filterPost: Partial<Filter>;
  setFilterPost: (filterPost: Partial<Filter>) => void;
  setPage: (page: number) => void;
}

export const useStore = create<PaginationState>((set) => ({
  page: 1,
  perPage: Constants.PER_PAGE_GET_LIST_POST,
  previousPage: 1,
  filterPost: {
    estado: '',
    views: '',
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
}));
