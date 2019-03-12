import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService, statusService } from './services';
import {
  Card,
  List,
  Row,
  Column,
  Navbar,
  Button,
  Form,
  DropdownButton,
  Dropdown,
  Item,
  Link,
  Nav,
  NavDropdown,
  FormControl,
  ListGroup,
  Table
} from 'react-bootstrap';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

class Menu extends Component {
  render() {
    return (
      <Navbar>
        <NavLink to="/">SUSU v2.0</NavLink>
        <NavLink activeStyle={{ color: 'pink' }} to="/bestilling">
          Bestilling
        </NavLink>

        <NavLink activeStyle={{ color: 'pink' }} to="/status">
          Status
        </NavLink>
      </Navbar>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Card>
        Til SUSU v2.0!
        <br />
        Dette er verdens beste informasjonssystem for utleie av sykler og utstyr.
      </Card>
    );
  }
}

class BestillingNew extends Component {
  navn = '';
  email = '';
  mobilnummer = '';

  til = '';
  fra = '';

  steder = [];

  render() {
    return (
      <React.Fragment>
        <Card>
          <ListGroup>
            <Form.Row>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Navn: </Form.Label>
                <Form.Control type="text" value={this.navn} onChange={e => (this.navn = e.target.value)} />
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Email: </Form.Label>
                <Form.Control type="text" value={this.email} onChange={e => (this.email = e.target.value)} />
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Mobilnummer: </Form.Label>
                <Form.Control
                  type="text"
                  value={this.mobilnummer}
                  onChange={e => (this.mobilnummer = e.target.value)}
                />
              </ListGroup.Item>
            </Form.Row>
          </ListGroup>
        </Card>
        <Card>
          <ListGroup>
            <Form.Row>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Fra: </Form.Label>
                <Form.Control type="datetime-local" value={this.fra} onChange={e => (this.fra = e.target.value)} />
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Til: </Form.Label>
                <Form.Control type="datetime-local" value={this.til} onChange={e => (this.il = e.target.value)} />
              </ListGroup.Item>
            </Form.Row>
          </ListGroup>
        </Card>
        <Card>
          <Dropdown>
            <Dropdown.Toggle variant="success">Hentested</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.steder.map(steder => (
                <Dropdown.Item key={steder.l_id}>{steder.lokasjon}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="success">Leveringssted</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.steder.map(steder => (
                <Dropdown.Item key={steder.l_id}>{steder.lokasjon}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Card>
      </React.Fragment>
    );
  }
  mounted() {
    bestillingService.hentSteder(steder => {
      this.steder = steder;
    });
  }
}

class Status extends Component {
  varer = [];
  sykler = [];
  utstyr = [];

  render() {
    return [
      <React.Fragment>
        <Dropdown>
          <Dropdown.Toggle variant="success">Velg sykkel</Dropdown.Toggle>
          <Dropdown.Menu>
            {this.sykler.map(sykler => (
              <Dropdown.Item as="button" to={'/status/' + sykler.type} key={sykler.type}>
                {sykler.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success">Velg utstyr</Dropdown.Toggle>
          <Dropdown.Menu>
            {this.utstyr.map(utstyr => (
              <Dropdown.Item as="button" key={utstyr.type}>
                {utstyr.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vare ID</th>
              <th>Type</th>
              <th>Pris</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.varer.map(varer => (
              <tr key={varer.v_id}>
                {varer.v_id}
                <td key={varer.id}>{varer.type}</td>
                <td key={varer.id}>{varer.pris}</td>
                <td key={varer.id}>{varer.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }

  mounted() {
    statusService.hentVarer(varer => {
      this.varer = varer;
    });
    statusService.hentSykler(sykler => {
      this.sykler = sykler;
    });
    statusService.hentUtstyr(utstyr => {
      this.utstyr = utstyr;
    });
  }
}

class StatusType extends Component {
  render() {
    return <div />;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/bestilling" component={BestillingNew} />
      <Route exact path="/status" component={Status} />
      <Route exact path="/status/:type" component={StatusType} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
