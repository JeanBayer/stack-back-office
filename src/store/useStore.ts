import { create } from 'zustand';

interface PaginationState {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setPerPage: (perPage: number) => void;
}

export const useStore = create<PaginationState>((set) => ({
  page: 1,
  perPage: 5,
  setPage: (page) => set({ page }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),
  setPerPage: (perPage) => set({ perPage }),
}));
