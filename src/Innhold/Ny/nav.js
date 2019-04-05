import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class Ny extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          <Nav.Link href="#/ny/sykkel">Sykkel</Nav.Link>
          <Nav.Link href="#/ny/utstyr">Utstyr</Nav.Link>
          <Nav.Link href="#/ny/lokasjon">Lokasjon</Nav.Link>
          <Nav.Link href="#/ny/restriksjon">Restriksjon</Nav.Link>
          <Nav.Link href="#/ny/nypris">Ny pris</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
