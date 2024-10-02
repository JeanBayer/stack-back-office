import { HomeLayout, PostCreate, PostDetail, PostEdit } from '@/page';
import { FormDinamicoBackPage } from '@form-dinamico-back/page';
import { TablaCompleja } from '@tabla-compleja/page';
import { PostsPage } from '@tabla-simple/page';
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
        <Route path="/form-dinamico-back" element={<FormDinamicoBackPage />} />
        <Route path="/tabla-simple" element={<PostsPage />} />
        <Route path="/tabla-compleja" element={<TablaCompleja />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
        <Route path="/posts/create" element={<PostCreate />} />
      </Route>
    </Routes>
  );
};
