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

  hentested = '';
  leveringssted = '';

  render() {
    return (
      <div>
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
          <ListGroup>
            <Form.Row>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Hentested: </Form.Label>
                <Form.Control type="text" value={this.hentested} onChange={e => (this.hentested = e.target.value)} />
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <Form.Label> Leveringssted: </Form.Label>
                <Form.Control
                  type="text"
                  value={this.leveringssted}
                  onChange={e => (this.leveringssted = e.target.value)}
                />
              </ListGroup.Item>
            </Form.Row>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

class Status extends Component {
  varer = [];

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>vare ID</th>
            <th>type</th>
            <th>pris</th>
            <th>status</th>
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
    );
  }

  mounted() {
    statusService.hentVarer(varer => {
      this.varer = varer;
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/bestilling" component={BestillingNew} />
      <Route exact path="/status" component={Status} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
