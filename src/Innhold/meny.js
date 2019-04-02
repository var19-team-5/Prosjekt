import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav } from 'react-bootstrap';

export class Menu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
<<<<<<< HEAD
        <Navbar.Brand href="#/">SUSU v7.7.3</Navbar.Brand>
=======
        <Navbar.Brand href="#/">SUSU v7.9</Navbar.Brand>
>>>>>>> 80dd1100f13996870cb4a3180d75c6f122723d49
        <Nav className="mr-auto">
          <Nav.Link href="#bestilling/ny">Bestilling</Nav.Link>
          <Nav.Link href="#status/alle">Status</Nav.Link>
          <Nav.Link href="#ny/sykkel">Ny</Nav.Link>
          <Nav.Link href="#oversikt/soversikt">Oversikt</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#hjelp">Hjelp</Nav.Link>
          <Nav.Link href="#info">Info</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
