import { useStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useSelectId = () => {
  const { id } = useParams();
  const selectPostId = useStore((state) => state.selectPostId);

  useEffect(() => {
    if (id) selectPostId(id);
  }, [id, selectPostId]);

  return { id };
};
