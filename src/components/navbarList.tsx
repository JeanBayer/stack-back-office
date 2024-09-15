import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const NavbarList = () => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/posts">
            Posts
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
