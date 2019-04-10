import * as React from 'react';
import { Component } from 'react-simplified';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Klasse for navigasjonsbar under bestilling
export class Bestilling extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav>
          {/*Link til ny bestilling og listen over bestillinger*/}
          <Nav.Link href="#/bestilling/ny" title="Ny bestilling">
            Ny bestilling
          </Nav.Link>
          <Nav.Link href="#/bestilling/liste" title="Bestillingsoversikt">
            Bestillinger
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
