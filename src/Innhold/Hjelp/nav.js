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
          {/*Link til ny bestilling og listen over bestillinger*/}
          <Nav.Link href="#/Hjelp/hjelp_bestille" title="Ny bestilling">
            Bestilling
          </Nav.Link>
          <Nav.Link href="#/Hjelp/hjelp_ny" title="Bestillingsoversikt">
            Legg til
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
