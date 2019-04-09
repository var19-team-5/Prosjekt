import * as React from 'react';
import { s_statuser, s_slett, s_bestilling } from './_bl_services';
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
  bestillinger = [];

  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Søk kundenavn"
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
                <th className="text-center">ID</th>
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
                  <td className="text-center">{bestilling.b_id}</td>
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
                      vis
                    </Button>
                  </div>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal centered size="lg" show={this.state.infoPop} onHide={this.skjulInfoPop}>
          <Modal.Header closeButton>
            <Modal.Title>Bestilling {this.b_id}</Modal.Title>
          </Modal.Header>
          {this.valgt.map(valgt => (
            <Modal.Body>
              <Row>
                <Col>
                  <div>
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
                    }).format(valgt.til)}
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
                    <br />
                    <ButtonGroup>
                      <DropdownButton as={ButtonGroup} title="Endre status" id="bg-nested-dropdown">
                        <Dropdown.Item onClick={this.bestilt}>Bestilt</Dropdown.Item>
                        <Dropdown.Item onClick={this.utlevert}>Utlevert</Dropdown.Item>
                        <Dropdown.Item onClick={this.transport}>Under transport</Dropdown.Item>
                        <Dropdown.Item onClick={this.savnet}>Savnet</Dropdown.Item>
                        <Dropdown.Item onClick={this.ferdig}>Levert tilbake</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                    <br />
                    <br />
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
            </Modal.Body>
          ))}
        </tbody>
      </Table>
    );
  }
  mounted() {
    s_bestilling.Bestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
  sok() {
    s_bestilling.SokNavn(this.navn, bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
  hent() {
    s_bestilling.InfoBestilling(this.b_id, valgt => {
      this.valgt = valgt;
    });
    s_bestilling.InfoBestillingVarer(this.b_id, varer => {
      this.varer = varer;
    });
    this.visInfoPop();
  }
  bestilt() {
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Bestilt(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }
  utlevert() {
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Utlevert(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }
  ferdig() {
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Ferdig(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }
  transport() {
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Transport(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  savnet() {
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Savnet(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  sikker() {
    this.visSikkerPop();
  }
  slett() {
    s_slett.Bestilling(this.b_id);

    this.mounted();
    this.hent();

    this.skjulInfoPop();
    this.skjulSikkerPop();
    this.visSlettPop();
  }
}
