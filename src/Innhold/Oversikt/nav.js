import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class Oversikt extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          <Nav.Link href="#/Oversikt/salg">Salg</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
