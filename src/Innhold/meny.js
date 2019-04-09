import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav } from 'react-bootstrap';

export class Menu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand title='Smart Utleie av Sykler og Utstyr'>SUSU v9.2</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#bestilling/ny" title='Bestillingside' >Bestilling</Nav.Link>
          <Nav.Link href="#status/alle" title='Status på varer'>Status</Nav.Link>
          <Nav.Link href="#ny/sykkel" title='Endre/Legg til'>Ny</Nav.Link>
          <Nav.Link href="#oversikt/statistikk" title='Oversikt'>Oversikt</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#hjelp">Hjelp</Nav.Link>
          <Nav.Link href="#info">Info</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
  mouseOver() {
  document.getElementById("demo").style.color = "red";
}
}
