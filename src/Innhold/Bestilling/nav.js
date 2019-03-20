import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class Bestilling extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          <Nav.Link href="#/bestilling/ny">Ny bestilling</Nav.Link>
          <Nav.Link href="#/bestilling/liste">Bestillinger</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
