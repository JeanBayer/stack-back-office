import { Link, Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <div>
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
      <footer>
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
};
