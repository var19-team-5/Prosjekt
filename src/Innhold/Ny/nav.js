import * as React from 'react';
import { Component } from 'react-simplified';
// Komponenter som blir brukt i dokumentet
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Klasse for navigasjonsbar under Ny
export class Ny extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          {/*Link til ny sykkel, utstyr, lokasjon, restrikasjon og pris*/}
          <Nav.Link href="#/ny/sykkel" title="Legg til sykkel">
            Sykkel
          </Nav.Link>
          <Nav.Link href="#/ny/utstyr" title="Legg til utstyr">
            Utstyr
          </Nav.Link>
          <Nav.Link href="#/ny/lokasjon" title="Legg til Lokasjon">
            Lokasjon
          </Nav.Link>
          <Nav.Link href="#/ny/restriksjon" title="Koble sykkel til utstyr">
            Restriksjon
          </Nav.Link>
          <Nav.Link href="#/ny/pris" title="Endre pris">
            Pris
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
