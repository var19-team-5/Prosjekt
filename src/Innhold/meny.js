import * as React from 'react';
import { Component } from 'react-simplified';
// Komponenter som blir brukt i dokumentet
import { Navbar, Nav } from 'react-bootstrap';

// Klasse for navigasjonsbar for hele applikasjonen
export class Meny extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        {/*Navn på applikasjonen*/}
        <Navbar.Brand>SUSU v9.2</Navbar.Brand>
        <Nav className="mr-auto">
          {/*Linker til venstre*/}
          <Nav.Link href="#bestilling/ny">Bestilling</Nav.Link>
          <Nav.Link href="#status/alle">Status</Nav.Link>
          <Nav.Link href="#ny/sykkel">Ny</Nav.Link>
          <Nav.Link href="#oversikt/salg">Oversikt</Nav.Link>
        </Nav>
        <Nav>
          {/*Linker til høyre*/}
          <Nav.Link href="#hjelp">Hjelp</Nav.Link>
          <Nav.Link href="#info">Info</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
