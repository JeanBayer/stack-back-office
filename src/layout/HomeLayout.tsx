import { Link, Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </header>
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
    </div>
  );
};
