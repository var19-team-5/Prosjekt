import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar, Nav } from 'react-bootstrap';

export class Menu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#/">SUSU v5.7</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#bestilling/ny">Bestilling</Nav.Link>
          <Nav.Link href="#status/alle">Status</Nav.Link>
          <Nav.Link href="#ny/sykkel">Ny</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
