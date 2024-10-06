import { HomeLayout } from '@/page';
import { Constants } from '@/utils';
import { FormDinamicoBackPage } from '@form-dinamico-back/page';
import { FormDinamicoEstaticoPage } from '@form-dinamico-estatico/page';
import { PostCreate, PostDetail, PostEdit } from '@form-simple/page';
import { TablaCompleja } from '@tabla-compleja/page';
import { PostsPage } from '@tabla-simple/page';
import { Route, Routes } from 'react-router-dom';

export const CustomRouter = () => {
  return (
    <Routes>
      <Route path={Constants.ROUTES.HOME} element={<HomeLayout />}>
        <Route
          path={Constants.ROUTES.HOME}
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
        <Route
          path={Constants.ROUTES.MISIONES_BACK}
          element={<FormDinamicoBackPage />}
        />
        <Route
          path={Constants.ROUTES.MISIONES_ESTATICO}
          element={<FormDinamicoEstaticoPage />}
        />
        <Route path={Constants.ROUTES.POSTS} element={<PostsPage />} />
        <Route path={Constants.ROUTES.VENTAS} element={<TablaCompleja />} />
        <Route path={Constants.ROUTES.POSTS_FORM} element={<PostDetail />} />
        <Route path={Constants.ROUTES.POSTS_FORM_EDIT} element={<PostEdit />} />
        <Route
          path={Constants.ROUTES.POSTS_FORM_CREATE}
          element={<PostCreate />}
        />
      </Route>
    </Routes>
  );
};
