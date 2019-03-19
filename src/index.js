import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { nyBestillingService, listeBestillingService, statusService, typeStatusService, nyService } from './services';
import {
  Card,
  List,
  Row,
  Col,
  Column,
  NavBar,
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
  InputGroup,
  Alert,
  Brand
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#/">SUSU</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#bestilling/ny">Bestilling</Nav.Link>
          <Nav.Link href="#status/alle">Status</Nav.Link>
          <Nav.Link href="#ny/sykkel">Ny</Nav.Link>
        </Nav>
      </Navbar>
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
      <Navbar bg="light" variant="light">
        <Nav>
          <Nav.Link href="#/bestilling/ny">Ny bestilling</Nav.Link>
          <Nav.Link href="#/bestilling/liste">Bestillinger</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

class BestillingNy extends Bestilling {
  navn = '';
  email = '';
  mobilnummer = '';

  til = '';
  fra = '';

  steder = [];
  typerSykler = [];
  typerUtstyr = [];

  kunde = [];

  render() {
    return (
      <React.Fragment>
        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label> Navn: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.kunde.navn}
                  onChange={e => (this.navn = e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label> Email: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.kunde.email}
                  onChange={e => (this.email = e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label> Mobilnummer: </Form.Label>
                <Form.Control required type="number" onChange={e => (this.mobilnummer = e.target.value)} />
                <br />
              </Col>
            </Row>
            <Button onClick={this.nyKunde}>Ny kunde</Button>
            <Button onClick={this.søkKunde}>Søk kunde</Button>
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label> Fra: </Form.Label>
                <Form.Control required type="datetime-local" onChange={e => (this.fra = e.target.value)} />
              </Col>
              <Col>
                <Form.Label> Til: </Form.Label>
                <Form.Control required type="datetime-local" onChange={e => (this.til = e.target.value)} />
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label>Hentested:</Form.Label>
                <Form.Control as="select" onChange={e => (this.henting = e.target.value)}>
                  {this.steder.map(sted => (
                    <option key={sted.l_id}>{sted.lokasjon}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Leveringsted:</Form.Label>
                <Form.Control as="select" onChange={e => (this.levering = e.target.value)}>
                  {this.steder.map(sted => (
                    <option key={sted.l_id}>{sted.lokasjon}</option>
                  ))}
                </Form.Control>
                <br />
              </Col>
            </Row>
            <Button onClick={this.nyBestilling}>Ny bestilling</Button>
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label>Type sykkel:</Form.Label>
                <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
                  {this.typerSykler.map(typeSykkel => (
                    <option key={typeSykkel.type} value={typeSykkel.type}>
                      {typeSykkel.type}
                    </option>
                  ))}
                  <br />
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Type sykkel:</Form.Label>
                <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
                  {this.typerUtstyr.map(typerUtstyr => (
                    <option key={typerUtstyr.type} value={typerUtstyr.type}>
                      {typerUtstyr.type}
                    </option>
                  ))}
                  <br />
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    );
  }
  mounted() {
    nyBestillingService.hentSteder(steder => {
      this.steder = steder;
    });
    typeStatusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    typeStatusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
  }
  nyKunde() {
    nyBestillingService.leggTilKunde(this.navn, this.email, this.mobilnummer);
  }

  søkKunde() {
    nyBestillingService.søkKunde(this.mobilnummer);
    nyBestillingService.søkKunde(kunde => {
      this.navn = kunde.navn;
      this.email = kunde.email;
    });
  }
  nyBestilling() {
    nyBestillingService.leggTilBestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer);
  }
}

class BestillingListe extends Bestilling {
  bestillinger = [];

  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Bestillings ID</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Kunde</th>
            <th>Hentested</th>
            <th>Leveringssted</th>
            <th>Rabatt</th>
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
              <td>{bestilling.navn}</td>
              <td>{bestilling.hentested}</td>
              <td>{bestilling.leveringssted}</td>
              <td>{bestilling.rabatt}</td>
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

        <ListGroup.Item className="list-group-item">
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
        </ListGroup.Item>
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
  lokasjoner = [];

  render() {
    return [
      <Table striped bordered hover size="sm">
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
          {this.varer.map(alle_varer => (
            <tr key={alle_varer.v_id}>
              <td>{alle_varer.v_id}</td>
              <td>{alle_varer.type}</td>
              <td>{alle_varer.lokasjon}</td>
              <td>{alle_varer.status}</td>
              <td>{alle_varer.pris}</td>
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
      <Table striped bordered hover size="sm">
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Ramme</th>
            <th>Girsystem</th>
            <th>Størrelse på hjul</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.sykler.map(alle_sykler => (
            <tr key={alle_sykler.v_id}>
              <td>{alle_sykler.v_id}</td>
              <td>{alle_sykler.type}</td>
              <td>{alle_sykler.ramme}</td>
              <td>{alle_sykler.girsystem}</td>
              <td>{alle_sykler.størrelse_hjul}</td>
              <td>{alle_sykler.lokasjon}</td>
              <td>{alle_sykler.status}</td>
              <td>{alle_sykler.pris}</td>
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
      <Table striped bordered hover size="sm">
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
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td>{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.lokasjon}</td>
              <td>{utstyr.status}</td>
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
      <Table striped bordered hover size="sm">
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Ramme</th>
            <th>Girsystem</th>
            <th>Størrelse på hjul</th>
            <th>Befinner seg</th>
            <th>Status</th>
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
              <td>{sykkel.lokasjon}</td>
              <td>{sykkel.status}</td>
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
      <Table striped bordered hover size="sm">
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
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td>{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.lokasjon}</td>
              <td>{utstyr.status}</td>
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
        <Button href="#/ny/restriksjon">Restriksjon</Button>
      </React.Fragment>
    );
  }
}
class NySykkel extends Ny {
  steder = [];
  typerSykler = [];

  nytype = '';
  nypris = '';

  ramme = '';
  girsystem = '';
  størrelse_hjul = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Form.Label>Type sykkel:</Form.Label>
          <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
            {this.typerSykler.map(typeSykkel => (
              <option key={typeSykkel.type} value={typeSykkel.type}>
                {typeSykkel.type}
              </option>
            ))}
            <br />
          </Form.Control>
        </ListGroup.Item>

        <ListGroup.Item className="list-group-item">
          <h4>Ligger ikke typen inne? Legg til ny her!</h4>
          <Row>
            <Col>
              <Form.Label>Ny type:</Form.Label>
              <Form.Control onChange={e => (this.nytype = e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.nypris = e.target.value)} />
              <br />
            </Col>
          </Row>
          <Button onClick={this.nyTypeSykkel}>Legg til ny type</Button>
        </ListGroup.Item>

        <Form.Group as={Column}>
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label>Tilhører:</Form.Label>
                <Form.Control as="select" onChange={e => (this.tilhører = e.target.value)}>
                  {this.steder.map(sted => (
                    <option key={sted.lokasjon} value={sted.tilhører}>
                      {sted.lokasjon}
                    </option>
                  ))}
                  <br />
                </Form.Control>
              </Col>

              <Col>
                <Form.Label>Ramme:</Form.Label>
                <Form.Control onChange={e => (this.ramme = e.target.value)} />
              </Col>
              <Col>
                <Form.Label>Girsystem:</Form.Label>
                <Form.Control type="number" onChange={e => (this.girsystem = e.target.value)} />
              </Col>
              <Col>
                <Form.Label>Størrese hjul:</Form.Label>
                <Form.Control type="number" onChange={e => (this.størrelse_hjul = e.target.value)} />
                <br />
              </Col>
            </Row>
            <Button onClick={this.nySykkel}>Legg til ny sykkel</Button>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    ];
  }

  mounted() {
    typeStatusService.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = typerSykler[0].type;
    });
    nyBestillingService.hentSteder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  nySykkel() {
    nyService.nySykkel(this.tilhører, this.lokasjon, this.type, this.ramme, this.girsystem, this.størrelse_hjul);
  }
  nyTypeSykkel() {
    typeStatusService.nyTypeSykkel(this.nytype, this.nypris);
  }
}

class NyLokasjon extends Ny {
  render() {
    return (
      <Form.Group as={Column}>
        <ListGroup.Item className="list-group-item">
          <Form.Label> Sted: </Form.Label>
          <Form.Control required type="text" onChange={e => (this.lokasjon = e.target.value)} />
          <br />
          <Button onClick={this.nyLokasjon}>Legg til</Button>
        </ListGroup.Item>
      </Form.Group>
    );
  }
  nyLokasjon() {
    nyService.nyLokasjon(this.lokasjon);
    alert('Lokasjonen ' + this.lokasjon + ' er lagt til!');
  }
}

class NyUtstyr extends Ny {
  steder = [];
  typerUtstyr = [];

  nytype = '';
  nypris = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Form.Label>Type utstyr:</Form.Label>
          <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
            {this.typerUtstyr.map(typeUtstyr => (
              <option key={typeUtstyr.type} value={typeUtstyr.type}>
                {typeUtstyr.type}
              </option>
            ))}
            <br />
          </Form.Control>
        </ListGroup.Item>

        <ListGroup.Item className="list-group-item">
          <h4>Ligger ikke typen inne? Legg til ny her!</h4>
          <Row>
            <Col>
              <Form.Label>Ny type:</Form.Label>
              <Form.Control onChange={e => (this.nytype = e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.nypris = e.target.value)} />
              <br />
            </Col>
          </Row>
          <Button onClick={this.nyTypeUtstyr}>Legg til ny type</Button>
        </ListGroup.Item>

        <Form.Group as={Column}>
          <ListGroup.Item className="list-group-item">
            <Form.Label>Tilhører:</Form.Label>
            <Form.Control id="test" as="select" onChange={e => (this.tilhører = e.target.value)}>
              {this.steder.map(sted => (
                <option key={sted.lokasjon} value={sted.tilhører}>
                  {sted.lokasjon}
                </option>
              ))}
            </Form.Control>
          </ListGroup.Item>

          <ListGroup.Item className="list-group-item">
            <Form.Label>Antall:</Form.Label>
            <Form.Control type="number" onChange={e => (this.antall = e.target.value)} />
            <br />
            <Button onClick={this.nyUtstyr}>Legg til nytt utstyr</Button>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    ];
  }

  mounted() {
    typeStatusService.alleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = typerUtstyr[0].type;
    });
    nyBestillingService.hentSteder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  nyUtstyr() {
    nyService.nyUtstyr(this.tilhører, this.type, this.antall);
    console.log(this.antall);
  }
  nyTypeUtstyr() {
    typeStatusService.nyTypeUtstyr(this.nytype, this.nypris);
  }
}

class NyRestriksjon extends Ny {
  typerSykler = [];
  typerUtstyr = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col>
              <Form.Label>Type sykkel:</Form.Label>
              <Form.Control as="select" onChange={e => (this.s_type = e.target.value)}>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Type Utstyr:</Form.Label>
              <Form.Control as="select" onChange={e => (this.u_type = e.target.value)}>
                {this.typerUtstyr.map(typerUtstyr => (
                  <option key={typerUtstyr.type} value={typerUtstyr.type}>
                    {typerUtstyr.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }
  mounted() {
    typeStatusService.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });

    typeStatusService.alleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
  }
  nyRestriksjon() {
    nyService.nyRestriksjon(this.s_type, this.u_type);
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />

      <Route path="/bestilling" component={Bestilling} />
      <Route exact path="/bestilling/ny" component={BestillingNy} />
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
      <Route exact path="/ny/restriksjon" component={NyRestriksjon} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
