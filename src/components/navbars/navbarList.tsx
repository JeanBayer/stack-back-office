import { Actions } from '@/components';
import { Constants } from '@/utils';
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const NavbarList = () => {
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to={Constants.ROUTES.POSTS}>
            tabla-simple
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={Constants.ROUTES.VENTAS}>
            tabla-compleja
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={Constants.ROUTES.MISIONES_BACK}>
            form-dinamico-back
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={Constants.ROUTES.MISIONES_ESTATICO}>
            form-dinamico-estatico
          </Link>
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <p>form-simple</p>
          <Actions
            actions={[
              {
                value: (
                  <Link
                    color="foreground"
                    to={Constants.ROUTES.POSTS_FORM_CREATE}
                  >
                    CREATE
                  </Link>
                ),
                label: 'CREATE',
              },
              {
                value: (
                  <Link
                    to={Constants.ROUTES.POSTS_FORM_EDIT.replace(
                      ':id',
                      'Jb25IN3jShwlASWk1Q1i',
                    )}
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
                    to={Constants.ROUTES.POSTS_FORM.replace(
                      ':id',
                      'Jb25IN3jShwlASWk1Q1i',
                    )}
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
    </Navbar>
  );
};
