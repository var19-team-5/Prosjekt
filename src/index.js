import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { nyBestillingService, listeBestillingService, statusService, typeStatusService, nyService } from './services';
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
        <Nav.Item as="li">
          <Nav.Link href="#/ny">Ny</Nav.Link>
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

class BestillingNew extends Bestilling {
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
              {this.steder.map(sted => (
                <option key={sted.lokasjon} onChange={e => (this.levering = e.target.value)}>
                  {sted.lokasjon}
                </option>
              ))}
            </Form.Control>
            <Form.Label>Leveringsted:</Form.Label>
            <Form.Control as="select">
              {this.steder.map(sted => (
                <option key={sted.lokasjon} onChange={e => (this.henting = e.target.value)}>
                  {sted.lokasjon}
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
    nyBestillingService.hentSteder(steder => {
      this.steder = steder;
    });
  }
  nyKunde() {
    nyBestillingService.leggTilKunde(this.navn, this.email, this.mobilnummer);
  }
  nyBestilling() {
    nyBestillingService.leggTilBestilling(this.fra, this.til, this.henting, this.levering);
  }
}

class BestillingListe extends Bestilling {
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
    listeBestillingService.hentBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
}

class Status extends Component {
  typerSykler = [];
  typerUtstyr = [];
  statuser = [];
  varer = [];
  v_id = '';

  render() {
    return [
      <React.Fragment>
        <Button href="#/status/alle">Alle varer</Button>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/sykler">Sykler</Button>

          <Dropdown.Toggle split id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.typerSykler.map(typeSykkel => (
              <Dropdown.Item key={typeSykkel.type} href={'#/status/sykler' + typeSykkel.type}>
                {typeSykkel.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/utstyr">Utstyr</Button>

          <Dropdown.Toggle split id="dropdown-split-basic" />

          <Dropdown.Menu>
            {this.typerUtstyr.map(typeUtstyr => (
              <Dropdown.Item key={typeUtstyr.type} href={'#/status/utstyr' + typeUtstyr.type}>
                {typeUtstyr.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <DropdownButton as={ButtonGroup} title="Status">
          {this.statuser.map(status => (
            <Dropdown.Item key={status.status} href={'#/status/statuser' + status.status}>
              {status.status}
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
    typeStatusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    typeStatusService.hentUtstyrTyper(typerUtstyr => {
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

class StatusListe extends Status {
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

class StatusStatus extends Status {
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

class StatusSykler extends Status {
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

class StatusUtstyr extends Status {
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

class StatusSøkVare extends Status {
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

class StatusSyklerType extends StatusSykler {
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
    typeStatusService.hentSyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
  }
}

class StatusUtstyrType extends StatusUtstyr {
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
    typeStatusService.hentUtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
  }
}

class Ny extends Component {
  render() {
    return (
      <React.Fragment>
        <Button href="#/ny/sykkel">Sykkel</Button>
        <Button href="#/ny/utstyr">Utstyr</Button>
        <Button href="#/ny/lokasjon">Lokasjon</Button>
      </React.Fragment>
    );
  }
}

class NySykkel extends Ny {
  render() {
    return <div />;
  }
}
class NyUtstyr extends Ny {
  render() {
    return <div />;
  }
}
class NyLokasjon extends Ny {
  render() {
    return <div />;
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

      <Route path="/status/sykler" component={StatusSykler} />
      <Route exact path="/status/sykler:type" component={StatusSyklerType} />

      <Route path="/status/utstyr" component={StatusUtstyr} />
      <Route exact path="/status/utstyr:type" component={StatusUtstyrType} />

      <Route exact path="/status/statuser:status" component={StatusStatus} />

      <Route path="/ny" component={Ny} />
      <Route exact path="/ny/sykkel" component={NySykkel} />
      <Route exact path="/ny/utstyr" component={NyUtstyr} />
      <Route exact path="/ny/lokasjon" component={NyLokasjon} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
