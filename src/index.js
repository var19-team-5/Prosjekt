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
  Table,
  ButtonGroup
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
      <Nav defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="#/">SUSU v2.3</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#/bestilling">Bestilling</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#/status">Status</Nav.Link>
        </Nav.Item>
      </Nav>
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

class StatusListe extends Component {
  varer = [];
  sykler = [];
  utstyr = [];

  render() {
    return [
      <React.Fragment>
        <Button href="#/status">Alle varer</Button>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/sykler" variant="success">
            Sykler
          </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.sykler.map(sykkel => (
              <Dropdown.Item key={sykkel.type} href={'#/status/' + sykkel.type}>
                {sykkel.type}
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
              <th>Befinner seg</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.varer.map(vare => (
              <tr key={vare.v_id}>
                {vare.v_id}
                <td key={vare.id}>{vare.type}</td>
                <td key={vare.id}>{vare.pris}</td>
                <td key={vare.id}>{vare.lokasjon}</td>
                <td key={vare.id}>{vare.status}</td>
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
    statusService.hentSyklerTyper(sykler => {
      this.sykler = sykler;
    });
    statusService.hentUtstyrTyper(utstyr => {
      this.utstyr = utstyr;
    });
  }
}

class StatusType extends Component {
  render() {
    return <div />;
  }
}

class StatusSykler extends Component {
  sykler = [];

  render() {
    return [
      <React.Fragment>
        <Button href="#/status">Alle varer</Button>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/sykler" variant="success">
            Sykler
          </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.sykler.map(sykkel => (
              <Dropdown.Item key={sykkel.type} href={'#/status/' + sykkel.type}>
                {sykkel.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vare ID</th>
              <th>Ramme</th>
              <th>Girsystem</th>
              <th>Størrelse på hjul</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            {this.sykler.map(sykkel => (
              <tr key={sykkel.v_id}>
                {sykkel.v_id}
                <td key={sykkel.id}>{sykkel.ramme}</td>
                <td key={sykkel.id}>{sykkel.girsystem}</td>
                <td key={sykkel.id}>{sykkel.størrelse_hjul}</td>
                <td key={sykkel.id}>{sykkel.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }
  mounted() {
    statusService.hentSykler(sykler => {
      this.sykler = sykler;
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/bestilling" component={BestillingNew} />
      <Route exact path="/status" component={StatusListe} />
      <Route exact path="/status/sykler" component={StatusSykler} />
      <Route exact path="/status/:type" component={StatusType} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
