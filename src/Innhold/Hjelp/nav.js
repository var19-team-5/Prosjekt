import * as React from 'react';
import { Component } from 'react-simplified';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Klasse for navigasjonsbar under bestilling
export class Hjelp extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          {/*Link til sidene under hjelp*/}
          <Nav.Link href="#/Hjelp/hjelp_bestille" title="Bestilling">
            Bestilling
          </Nav.Link>
          <Nav.Link href="#/Hjelp/hjelp_ny" title="Legg til">
            Legg til
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
