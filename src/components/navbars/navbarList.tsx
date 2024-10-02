import { Actions } from '@/components';
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const NavbarList = () => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/tabla-simple">
            tabla-simple
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/tabla-compleja">
            tabla-compleja
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/form-dinamico-back">
            form-dinamico-back
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/form-dinamico-back">
            form-dinamico-estatico
          </Link>
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <p>form-simple</p>
          <Actions
            actions={[
              {
                value: (
                  <Link color="foreground" to="/form-simple/posts/create">
                    CREATE
                  </Link>
                ),
                label: 'CREATE',
              },
              {
                value: (
                  <Link
                    to={`/form-simple/posts/Jb25IN3jShwlASWk1Q1i/edit`}
                    className="flex items-center"
                  >
                    EDIT
                  </Link>
                ),
                label: 'EDIT',
              },
              {
                value: (
                  <Link
                    to={`/form-simple/posts/Jb25IN3jShwlASWk1Q1i`}
                    className="flex items-center"
                  >
                    SHOW
                  </Link>
                ),
                label: 'SHOW',
              },
            ]}
          />
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
