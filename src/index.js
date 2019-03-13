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
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {vare.v_id}
                <td key={vare.v_id}>{vare.type}</td>
                <td key={vare.v_id}>{vare.lokasjon}</td>
                <td key={vare.v_id}>{vare.status}</td>
                <td key={vare.v_id}>{vare.pris}</td>
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
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
  }
}

class StatusStatus extends Component {
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {vare.v_id}
                <td>{vare.type}</td>
                <td>{vare.lokasjon}</td>
                <td>{vare.status}</td>
                <td>{vare.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }

  mounted() {
    statusService.hentVarerStatus(this.props.match.params.status, varer => {
      this.varer = varer;
    });
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
  }
}

class StatusSyklerType extends Component {
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

  sykler = [];
  utstyr = [];

  render() {
    return [
      <React.Fragment>
        <Button href="#/status">Alle varer</Button>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/sykler" variant="success">
            TYPE (?)
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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {sykler.v_id}
                <td>{sykler.type}</td>
                <td>{sykler.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }
  mounted() {
    statusService.hentSyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
  }
}

class StatusUtstyrType extends Component {
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

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
            {this.typerSykler.map(typerSykler => (
              <Dropdown.Item key={typerSykler.type} href={'#/status/sykler' + typerSykler.type}>
                {typerSykler.type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup}>
          <Button href="#/status/utstyr" variant="success">
            TYPE (?)
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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {utstyr.v_id}
                <td>{utstyr.type}</td>
                <td>{utstyr.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }
  mounted() {
    statusService.hentUtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
  }
}

class StatusSykler extends Component {
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {sykkel.v_id}
                <td>{sykkel.type}</td>
                <td>{sykkel.ramme}</td>
                <td>{sykkel.girsystem}</td>
                <td>{sykkel.størrelse_hjul}</td>
                <td>{sykkel.pris}</td>
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
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
    });
  }
}

class StatusUtstyr extends Component {
  typerSykler = [];
  typerUtstyr = [];

  statuser = [];

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

        <DropdownButton id="dropdown-basic-button" title="Status">
          {this.statuser.map(statuser => (
            <Dropdown.Item key={statuser.status} href={'#/status' + statuser.status}>
              {statuser.status}
            </Dropdown.Item>
          ))}
        </DropdownButton>

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
                {utstyr.v_id}
                <td>{utstyr.type}</td>
                <td>{utstyr.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ];
  }
  mounted() {
    statusService.hentUtstyr(utstyr => {
      this.utstyr = utstyr;
    });
    statusService.hentSyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    statusService.hentUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    statusService.hentStatuser(statuser => {
      this.statuser = statuser;
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
      <Route exact path="/status/utstyr" component={StatusUtstyr} />
      <Route exact path="/status/sykler:type" component={StatusSyklerType} />
      <Route exact path="/status:status" component={StatusStatus} />
      <Route exact path="/status/utstyr:type" component={StatusUtstyrType} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
