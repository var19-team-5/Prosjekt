import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { s_typer, s_hent } from './../../services';
import { Navbar, Nav, NavDropdown, ListGroup, InputGroup, FormControl } from 'react-bootstrap';

export class Status extends Component {
  typerSykler = [];
  typerUtstyr = [];
  statuser = [];
  varer = [];
  v_id = '';

  render() {
    return [
      <React.Fragment>
        <Navbar bg="light" variant="light">
          <Nav>
            <Nav.Link href="#/status/alle">Alle varer</Nav.Link>
            <Nav.Link href="#/status/sykler">Sykler</Nav.Link>
            <NavDropdown id="nav-dropdown">
              {this.typerSykler.map(typeSykkel => (
                <NavDropdown.Item key={typeSykkel.type} href={'#/status/sykler' + typeSykkel.type}>
                  {typeSykkel.type}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href="#/status/utstyr">Utstyr</Nav.Link>
            <NavDropdown id="nav-dropdown">
              {this.typerUtstyr.map(typerUtstyr => (
                <NavDropdown.Item key={typerUtstyr.type} href={'#/status/utstyr' + typerUtstyr.type}>
                  {typerUtstyr.type}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Status" id="nav-dropdown">
              {this.statuser.map(status => (
                <NavDropdown.Item key={status.status} href={'#/status/statuser' + status.status}>
                  {status.status}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar>

        <ListGroup.Item className="list-group-item">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="vare ID"
              aria-describedby="basic-addon2"
              type="text"
              onInput={e => (this.v_id = e.target.value)}
              onChange={() => {
                location.href = '#/status/alle' + this.v_id;
              }}
            />
          </InputGroup>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }

  mounted() {
    s_typer.SyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    s_typer.UtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    s_typer.Statuser(statuser => {
      this.statuser = statuser;
    });
    s_hent.Varer(varer => {
      this.varer = varer;
    });
  }
}
