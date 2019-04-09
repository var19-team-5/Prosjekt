import * as React from 'react';
import { Component } from 'react-simplified';
// Komponenter som blir brukt i dokumentet
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Klasse for navigasjonsbar under bestilling
export class Bestilling extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          {/*Link til ny bestilling og listen over bestillinger*/}
          <Nav.Link href="#/bestilling/ny">Ny bestilling</Nav.Link>
          <Nav.Link href="#/bestilling/liste">Bestillinger</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
