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
        <Navbar.Brand title="Smart Utleie av Sykler og Utstyr">SUSU v9.4</Navbar.Brand>
        <Nav className="mr-auto">
          {/*Linker til venstre*/}
          <Nav.Link href="#bestilling/ny" title="Bestillingside">
            Bestilling
          </Nav.Link>
          <Nav.Link href="#status/alle" title="Status på varer">
            Status
          </Nav.Link>
          <Nav.Link href="#ny/sykkel" title="Endre/Legg til">
            Ny
          </Nav.Link>
          <Nav.Link href="#oversikt/statistikk" title="Oversikt">
            Oversikt
          </Nav.Link>
        </Nav>
        <Nav>
          {/*Linker til høyre*/}
          <Nav.Link href="#hjelp/hjelp_bestille">Hjelp</Nav.Link>
          <Nav.Link href="#info">Info</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
  mouseOver() {
    document.getElementById('demo').style.color = 'red';
  }
}
