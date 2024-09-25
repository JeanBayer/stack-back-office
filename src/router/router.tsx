import {
  HomeLayout,
  PostCreate,
  PostDetail,
  PostEdit,
  PostsPage,
  PruebaPage,
} from '@/page';
import { Route, Routes } from 'react-router-dom';

export const CustomRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route
          path="/"
          element={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
              }}
            >
              Home
            </div>
          }
        />
        <Route path="/prueba" element={<PruebaPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
        <Route path="/posts/create" element={<PostCreate />} />
      </Route>
    </Routes>
  );
};
