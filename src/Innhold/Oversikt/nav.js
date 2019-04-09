import * as React from 'react';
import { Component } from 'react-simplified';
// Komponenter som blir brukt i dokumentet
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Klasse for navigasjonsbar under Oversikt
export class Oversikt extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          {/*Link til salgs- og vareoversikt*/}
          <Nav.Link href="#/Oversikt/salg">Salg</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
