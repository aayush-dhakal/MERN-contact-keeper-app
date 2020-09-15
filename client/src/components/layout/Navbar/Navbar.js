import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../../context/auth/AuthContext";
import ContactContext from "../../../context/contact/ContactContext";

// if you use module extension in css file then that file's css will only be valid for this particular component only ie the styles will not be applied globally across all the components
import styles from "./Navbar.module.css";

const NavbarComponent = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext=useContext(ContactContext)

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();

    // when you logout and then login from a different account then there you will see a split second flash of contacts that were from the previous logged in user's contacts. The reason this happens is it takes some time to load new state for the contacts and in that delay it will load the contacts from previous state and hence that flash of previous user's contact is seen. And hence to prevent this we clear the contacts stats after logging out
    clearContacts();
  };

  const authLinks = (
    <>
      <Nav.Link className="text-white">
        Hello {user && <span className="text-success">{user.name}</span>}
      </Nav.Link>

      <Nav.Link onClick={onLogout} className="text-white">
        Logout
      </Nav.Link>
    </>
  );

  const guestLinks = (
    <>
      <LinkContainer to="/register">
        <Nav.Link className="text-white">Register</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/login">
        <Nav.Link className="text-white">Login</Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    // use styles.classname to define the classes if module extension is used in css file
    <Navbar className={styles.navbar} expand="lg" variant="dark">
      {/* variant='dark' will give toggler white outer line */}
      <LinkContainer to="/">
        <Navbar.Brand className="text-white">
          <i className={icon}></i>
          {title}
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? authLinks : guestLinks}

          <LinkContainer to="/about">
            <Nav.Link className="text-white">About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
