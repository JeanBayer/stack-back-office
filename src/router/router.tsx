import { PostDetail, PostEdit, PostsPage, HomeLayout } from '@/page';
import { createBrowserRouter } from 'react-router-dom';

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
