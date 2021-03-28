import { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import '../node_modules/nprogress/nprogress.css';
import Search from './blog/Search';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink style={{ cursor: 'pointer' }} className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        {/* <Search /> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Search />
            </NavItem>
            <NavItem>
              <Link href="/blogs">
                <NavLink style={{ cursor: 'pointer' }}>Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/contact">
                <NavLink style={{ cursor: 'pointer' }}>Contact</NavLink>
              </Link>
            </NavItem>
            {!isAuth() && (
              <Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer' }}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer' }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            )}

            {isAuth() && (
              <Fragment>
                <NavItem>
                  <NavLink
                    onClick={() => signout(() => Router.replace('/signin'))}
                    style={{ cursor: 'pointer' }}
                  >
                    Signout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      isAuth().role
                        ? Router.push('/admin')
                        : Router.push('/user');
                    }}
                  >
                    {isAuth().name}'s Dashboard
                  </NavLink>
                </NavItem>
                
              </Fragment>
            )}
             <NavItem>
              <Link href="/user/crud/blog">
                <NavLink className='btn btn-primary text-light' style={{ cursor: 'pointer' }}>Write a blog</NavLink>
              </Link>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
      {/* <Search/> */}
    </Fragment>
  );
};

export default Header;
