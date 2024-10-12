import { MisionCreate, MisionEdit } from '@/examples/form-dinamico-back/page';
import { MisionDetails } from '@/examples/form-dinamico-back/page/[id]/page';
import { HomeLayout } from '@/page';
import { FormDinamicoBackPage } from '@form-dinamico-back/page';
import { FormDinamicoEstaticoPage } from '@form-dinamico-estatico/page';
import { PostCreate, PostDetail, PostEdit } from '@form-simple/page';
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
        <Route path="/form-dinamico-back/create" element={ <MisionCreate />} />
        <Route path="/form-dinamico-back/create" element={ <MisionCreate />} />
        <Route path="/form-dinamico-back/:id/edit" element={<MisionEdit />} />
        <Route path="/form-dinamico-back/:id" element={<MisionDetails />} />
        
        <Route
          path="/form-dinamico-estatico"
          element={<FormDinamicoEstaticoPage />}
        />
        <Route path="/tabla-simple" element={<PostsPage />} />
        <Route path="/tabla-compleja" element={<TablaCompleja />} />
        <Route path="/form-simple/posts/:id" element={<PostDetail />} />
        <Route path="/form-simple/posts/:id/edit" element={<PostEdit />} />
        <Route path="/form-simple/posts/create" element={<PostCreate />} />
      </Route>
    </Routes>
  );
};
