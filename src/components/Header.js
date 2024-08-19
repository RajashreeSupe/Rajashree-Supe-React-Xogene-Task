import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>XOGENE LOGO</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;