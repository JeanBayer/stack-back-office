import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { PostDetail } from '../page/PostDetail';
import { PostEdit } from '../page/PostEdit';
import { PostsPage } from '../page/PostsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: (
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
        ),
      },
      {
        path: '/posts',
        element: <PostsPage />,
      },
      {
        path: '/posts/:id',
        element: <PostDetail />,
      },
      {
        path: '/posts/:id/edit',
        element: <PostEdit />,
      },
    ],
  },
]);
