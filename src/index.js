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
  ButtonGroup,
  InputGroup
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
          <Nav.Link href="#/">SUSU v3.3</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#/bestilling/ny">Bestilling</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#/status/alle">Status</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Card>
        Til SUSU v3.2!
        <br />
        Dette er verdens beste informasjonssystem for utleie av sykler og utstyr.
      </Card>
    );
  }
}

class Bestilling extends Component {
  render() {
    return (
      <React.Fragment>
        <Button href="#/bestilling/ny">Ny bestilling</Button>
        <Button href="#/bestilling/liste">Bestillinger</Button>
      </React.Fragment>
    );
  }
}

class Status extends Component {
  typerSykler = [];
  typerUtstyr = [];
  statuser = [];
  varer = [];

  render() {
    return [
      <React.Fragment>
        <Button href="#/status/alle">Alle varer</Button>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/sykler" variant="success">
            Sykler
          </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.typerSykler.map(typerSykler => (
              <Dropdown.Item key={typerSykler.type} href={'#/status/sykler' + typerSykler.type}>
                {typerSykler.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/utstyr" variant="success">
            Utstyr
          </Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.typerUtstyr.map(typerUtstyr => (
              <Dropdown.Item key={typerUtstyr.type} href={'#/status/utstyr' + typerUtstyr.type}>
                {typerUtstyr.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <DropdownButton as={ButtonGroup} title="Status" variant="success">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status/statuser' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <br />
        <br />

        <InputGroup className="mb-3">
          <FormControl
            placeholder="vare ID"
            aria-describedby="basic-addon2"
            type="text"
            onChange={e => (this.v_id = e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" href={'#/status/alle' + this.v_id}>
              SØK
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </React.Fragment>
    ];
  }

  mounted() {
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
    statusService.hentVarer(varer => {
      this.varer = varer;
    });
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
        <Form.Group as={Column}>
          <ListGroup.Item className="list-group-item">
            <Form.Label> Navn: </Form.Label>
            <Form.Control required type="text" onChange={e => (this.navn = e.target.value)} />
            <Form.Label> Email: </Form.Label>
            <Form.Control required type="text" onChange={e => (this.email = e.target.value)} />
            <Form.Label> Mobilnummer: </Form.Label>
            <Form.Control required type="number" onChange={e => (this.mobilnummer = e.target.value)} />
            <br />
            <Button onClick={this.nyKunde}>Ny kunde</Button>
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Form.Label> Fra: </Form.Label>
            <Form.Control required type="datetime-local" onChange={e => (this.fra = e.target.value)} />
            <Form.Label> Til: </Form.Label>
            <Form.Control required type="datetime-local" onChange={e => (this.til = e.target.value)} />
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Form.Label>Hentested:</Form.Label>
            <Form.Control as="select">
              {this.steder.map(steder => (
                <option key={steder.lokasjon} onChange={e => (this.levering = e.target.value)}>
                  {steder.lokasjon}
                </option>
              ))}
            </Form.Control>
            <Form.Label>Leveringsted:</Form.Label>
            <Form.Control as="select">
              {this.steder.map(steder => (
                <option key={steder.lokasjon} onChange={e => (this.henting = e.target.value)}>
                  {steder.lokasjon}
                </option>
              ))}
            </Form.Control>
            <br />
            <Button onClick={this.nyBestilling}>Ny bestilling</Button>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    );
  }
  mounted() {
    bestillingService.hentSteder(steder => {
      this.steder = steder;
    });
  }
  nyKunde() {
    bestillingService.leggTilKunde(this.navn, this.email, this.mobilnummer);
  }
  nyBestilling() {
    bestillingService.leggTilBestilling(this.fra, this.til, this.henting, this.levering);
  }
}

class BestillingListe extends Component {
  bestillinger = [];

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bestillings ID</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.bestillinger.map(bestilling => (
            <tr key={bestilling.b_id}>
                <td>{bestilling.b_id}</td>
                <td>
              {new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(bestilling.fra)}
              </td>
              <td>
              {new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(bestilling.til)}
              </td>
              <td>{bestilling.status}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  mounted() {
    bestillingService.hentBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
}

class StatusListe extends Component {
  varer = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.varer.map(vare => (
            <tr key={vare.v_id}>
              <td>{vare.v_id}</td>
              <td>{vare.type}</td>
              <td>{vare.lokasjon}</td>
              <td>{vare.status}</td>
              <td>{vare.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }

  mounted() {
    statusService.hentVarer(varer => {
      this.varer = varer;
    });
  }
}

class StatusStatus extends Component {
  varer = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.varer.map(vare => (
            <tr key={vare.v_id}>
              <td>{vare.v_id}</td>
              <td>{vare.type}</td>
              <td>{vare.lokasjon}</td>
              <td>{vare.status}</td>
              <td>{vare.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }

  mounted() {
    statusService.hentVarerStatus(this.props.match.params.status, varer => {
      this.varer = varer;
    });
  }
}

class StatusSyklerType extends Component {
  sykler = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.sykler.map(sykler => (
            <tr key={sykler.v_id}>
              <td>{sykler.v_id}</td>
              <td>{sykler.type}</td>
              <td>{sykler.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    statusService.hentSyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
  }
}

class StatusUtstyrType extends Component {
  utstyr = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td>{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    statusService.hentUtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
  }
}

class StatusSykler extends Component {
  sykler = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Ramme</th>
            <th>Girsystem</th>
            <th>Størrelse på hjul</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.sykler.map(sykkel => (
            <tr key={sykkel.v_id}>
              <td>{sykkel.v_id}</td>
              <td>{sykkel.type}</td>
              <td>{sykkel.ramme}</td>
              <td>{sykkel.girsystem}</td>
              <td>{sykkel.størrelse_hjul}</td>
              <td>{sykkel.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    statusService.hentSykler(sykler => {
      this.sykler = sykler;
    });
  }
}

class StatusUtstyr extends Component {
  utstyr = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td>{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    statusService.hentUtstyr(utstyr => {
      this.utstyr = utstyr;
    });
  }
}

class StatusSøkVare extends Component {
  vare = [];

  render() {
    return [
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.vare.map(vare => (
            <tr key={vare.v_id}>
              <td>{vare.v_id}</td>
              <td>{vare.type}</td>
              <td>{vare.lokasjon}</td>
              <td>{vare.status}</td>
              <td>{vare.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }

  mounted() {
    statusService.hentVarerSøk(this.props.match.params.v_id, vare => {
      this.vare = vare;
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />

      <Route path="/bestilling" component={Bestilling} />
      <Route exact path="/bestilling/ny" component={BestillingNew} />
      <Route exact path="/bestilling/liste" component={BestillingListe} />

      <Route path="/status" component={Status} />
      <Route exact path="/status/alle" component={StatusListe} />
      <Route exact path="/status/alle:v_id" component={StatusSøkVare} />
      <Route exact path="/status/sykler" component={StatusSykler} />
      <Route exact path="/status/utstyr" component={StatusUtstyr} />
      <Route exact path="/status/sykler:type" component={StatusSyklerType} />
      <Route exact path="/status/utstyr:type" component={StatusUtstyrType} />
      <Route exact path="/status/statuser:status" component={StatusStatus} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
