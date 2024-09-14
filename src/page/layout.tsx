import { NavbarList, Toaster } from '@/components';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavbarList />

      <main>
        <Outlet />
      </main>
      <footer
        style={{
          marginTop: 'auto',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <p>© 2024 My Website</p>
      </footer>
      <Toaster />
    </div>
  );
};
