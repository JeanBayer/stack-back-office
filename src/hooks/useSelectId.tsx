import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const useSelectId = () => {
  const { id } = useParams();
  const selectPostId = useStore((state) => state.selectPostId);

  useEffect(() => {
    if (id) selectPostId(id);
  }, [id, selectPostId]);

  return { id };
};