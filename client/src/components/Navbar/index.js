import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          {/* <NavLink to='/about' activeStyle>
            About
          </NavLink> */}
          <NavLink to='/' activeStyle>
            home
          </NavLink>
          <NavLink to='/portfolio' activeStyle>
            portfolio
          </NavLink>
          
          {/* <NavLink to='/annual' activeStyle>
            Annual Report
          </NavLink>
          <NavLink to='/team' activeStyle>
            Teams
          </NavLink>
          <NavLink to='/blogs' activeStyle>
            Blogs
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;