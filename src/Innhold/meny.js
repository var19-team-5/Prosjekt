import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav } from 'react-bootstrap';

export class Menu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#bestilling/ny">SUSU v9</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#bestilling/ny">Bestilling</Nav.Link>
          <Nav.Link href="#status/alle">Status</Nav.Link>
          <Nav.Link href="#ny/sykkel">Ny</Nav.Link>
          <Nav.Link href="#oversikt/salg">Oversikt</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#hjelp">Hjelp</Nav.Link>
          <Nav.Link href="#info">Info</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
