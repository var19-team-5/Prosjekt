import * as React from 'react';
import { s_hent, s_sok, s_endre } from './../../services';
import {
  Table,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Modal,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingListe extends Bestilling {
  constructor(props, context) {
    super(props, context);

    this.visInfoPop = this.visInfoPop.bind(this);
    this.SkjulInfoPop = this.SkjulInfoPop.bind(this);

    this.state = {
      infoPop: false
    };
  }

  SkjulInfoPop() {
    this.setState({ infoPop: false });
  }

  visInfoPop() {
    this.setState({ infoPop: true });
  }

  bestillinger = [];
  valgt = [];
  varer = [];

  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Søk på et navn!"
              aria-describedby="basic-addon2"
              type="text"
              value={this.navn}
              onInput={e => (this.navn = e.target.value)}
              onChange={this.sok}
            />
          </InputGroup>
        </ListGroup.Item>
        <div className="status">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Kunde</th>
                <th>Hentested</th>
                <th>Leveringssted</th>
                <th className="text-center">Rabatt</th>
                <th className="text-center">Pris</th>
                <th>Status</th>
                <th className="text-center">Info</th>
              </tr>
            </thead>
            <tbody>
              {this.bestillinger.map(bestilling => (
                <tr value={bestilling.b_id}>
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
                  <td className="text-center">{bestilling.rabatt}</td>
                  <td className="text-center">{bestilling.pris}</td>
                  <td>{bestilling.status}</td>
                  <div className="text-center">
                    <Button value={bestilling.b_id} onClick={e => (this.b_id = e.target.value) && this.hent(e)}>
                      Vis
                    </Button>
                  </div>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal show={this.state.infoPop} onHide={this.SkjulInfoPop}>
          <Modal.Header closeButton>
            <Modal.Title>Bestilling {this.b_id}</Modal.Title>
          </Modal.Header>
          <Row>
            <Col>
              <div>
                {this.valgt.map(valgt => (
                  <Modal.Body>
                    Kunde: {valgt.navn} <br />
                    <br />
                    Fra:{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(valgt.fra)}
                    <br />
                    Til:{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(valgt.leggTil)}
                    <br />
                    <br />
                    Hentested: {valgt.hentested}
                    <br />
                    Leveringsted: {valgt.leveringssted}
                    <br />
                    <br />
                    Rabatt: {valgt.rabatt}
                    <br />
                    Pris: {valgt.pris}
                    <br />
                    <br />
                    Status: {valgt.status}
                  </Modal.Body>
                ))}
                <ButtonGroup>
                  <DropdownButton as={ButtonGroup} title="Endre status" id="bg-nested-dropdown">
                    <Dropdown.Item onClick={this.bestilt}>Bestilt</Dropdown.Item>
                    <Dropdown.Item onClick={this.utlevert}>Utlevert</Dropdown.Item>
                    <Dropdown.Item onClick={this.ferdig}>Ferdig</Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>
              </div>
            </Col>
            <Col>
              <div className="bekreftelse">
                <Table striped bordered hover size="sm" xs={2}>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.varer.map(vare => (
                      <tr key={vare.v_id}>
                        <td className="text-center">{vare.v_id}</td>
                        <td>{vare.type}</td>
                        <td>{vare.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.SkjulInfoPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
  mounted() {
    s_hent.Bestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
  sok() {
    s_sok.Bestilling(this.navn, bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
  hent() {
    s_sok.SpesBestilling(this.b_id, valgt => {
      this.valgt = valgt;
    });
    s_sok.SpesBestillingVarer(this.b_id, varer => {
      this.varer = varer;
    });
    this.visInfoPop();
  }
  bestilt() {
    for (var i = 0; i < this.varer.length; i++) {
      s_endre.BestiltVare(this.varer[i].v_id);
    }
    s_endre.BestiltBest(this.b_id);
    this.mounted();
    this.hent();
  }
  utlevert() {
    for (var i = 0; i < this.varer.length; i++) {
      s_endre.UtlevertVare(this.varer[i].v_id);
    }
    s_endre.UtlevertBest(this.b_id);
    this.mounted();
    this.hent();
  }
  ferdig() {
    for (var i = 0; i < this.varer.length; i++) {
      s_endre.FerdigVare(this.varer[i].v_id);
    }
    s_endre.FerdigBest(this.b_id);
    this.mounted();
    this.hent();
  }
}
