import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup, Modal } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingNy extends Bestilling {
  constructor(props, context) {
    super(props, context);

    this.visBestillingPop = this.visBestillingPop.bind(this);
    this.skjulBestillingPop = this.skjulBestillingPop.bind(this);

    this.visKundePop = this.visKundePop.bind(this);
    this.skjulKundePop = this.skjulKundePop.bind(this);

    this.visFullførtPop = this.visFullførtPop.bind(this);
    this.skjulFullførtPop = this.skjulFullførtPop.bind(this);

    this.valgt = {
      idListe: []
    };
    this.summer = {
      prisListe: []
    };
    this.varerx = {
      vareListe: []
    };
    this.state = {
      vSykkel: true,
      vUtstyr: false,
      bestillingPop: false,
      kundePop: false,
      fullførtPop: false
    };
  }

  skjulBestillingPop() {
    this.setState({ bestillingPop: false });
  }

  visBestillingPop() {
    this.setState({ bestillingPop: true });
  }

  skjulKundePop() {
    this.setState({ kundePop: false });
  }

  visKundePop() {
    this.setState({ kundePop: true });
  }

  skjulFullførtPop() {
    this.setState({ fullførtPop: false });
  }

  visFullførtPop() {
    this.setState({ fullførtPop: true });
  }
  handleClose2() {
    this.setState({ show2: false });
  }

  handleShow2() {
    this.setState({ show2: true });
  }

  operationS() {
    this.setState({
      vSykkel: true,
      vUtstyr: false
    });
  }

  operationU() {
    this.setState({
      vSykkel: false,
      vUtstyr: true
    });
  }

  til = '';
  fra = '';
  idListe = [];
  steder = [];
  typerSykler = [];
  typerUtstyr = [];
  kunde = [];
  sykler = [];
  utstyr = [];
  kundeListe = [];

  v_id = [];

  prisListe = [];
  vareListe = [];

  varer = [];

  totalSum = [];

  render() {
    const { valgt } = this.state;
    const { prisListe } = this.summer;
    const { vareListe } = this.varerx;

    return (
      <React.Fragment>
        <Row xs={3}>
          <Col xs={3}>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
                  <Form.Label> Mobilnummer: </Form.Label>
                  <Form.Control
                    placeholder="Søk eksisterende mob.nr."
                    required
                    type="number"
                    onInput={e => (this.mobilnummer = e.target.value)}
                    onChange={this.sokKunde}
                  />

                  <Form.Label> Navn: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="navnfelt"
                    value={this.navn}
                    onInput={e => (this.navn = e.target.value)}
                  />

                  <Form.Label> Email: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="emailfelt"
                    value={this.email}
                    onInput={e => (this.email = e.target.value)}
                  />
                </Col>
              </Row>
              <br />
              <Button onClick={this.nyKunde}>Ny kunde</Button>
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
            </ListGroup.Item>
          </Col>
          <Col xs={6}>
            <ListGroup.Item className="list-group-item">
              <Row xs={6}>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={() => this.operationS()}
                    onClick={this.sokLedigeSyklerType}
                    onInput={e => (this.type = e.target.value)}
                  >
                    <option hidden>Velg sykkeltype</option>
                    {this.typerSykler.map(typeSykkel => (
                      <option key={typeSykkel.type} value={typeSykkel.type}>
                        {typeSykkel.type}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={() => this.operationU()}
                    onClick={this.sokLedigeUtstyrType}
                    onInput={e => (this.type = e.target.value)}
                  >
                    <option hidden>Velg utstyrstype</option>
                    {this.typerUtstyr.map(typerUtstyr => (
                      <option key={typerUtstyr.type} value={typerUtstyr.type}>
                        {typerUtstyr.type}
                      </option>
                    ))}
                  </Form.Control>
                  <br />
                </Col>
              </Row>
            </ListGroup.Item>
            {this.state.vSykkel ? (
              <div className="table">
                <Table striped bordered hover size="sm" xs={6}>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th>Type</th>
                      <th>Ramme</th>
                      <th className="text-center">Gir</th>
                      <th className="text-center">Hjul</th>
                      <th className="text-center">Pris</th>
                      <th className="text-center">Velg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.sykler.map(sykkel => (
                      <tr key={sykkel.v_id}>
                        <td className="text-center">{sykkel.v_id}</td>
                        <td>{sykkel.type}</td>
                        <td>{sykkel.ramme}</td>
                        <td className="text-center">{sykkel.girsystem}</td>
                        <td className="text-center">{sykkel.størrelse_hjul}</td>
                        <td className="text-center">{sykkel.pris}</td>
                        <Form.Check
                          tagName="box"
                          id={sykkel.v_id}
                          value={sykkel.pris}
                          onClick={e => (this.v_id = e.target.id) && (this.pris = parseInt(e.target.value))}
                          className="text-center"
                          onChange={e => {
                            this.leggTil(e);
                          }}
                        />
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
            {this.state.vUtstyr ? (
              <div className="table">
                <Table striped bordered hover size="sm" xs={6}>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th>Type</th>
                      <th className="text-center">Pris</th>
                      <th className="text-center">Velg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.utstyr.map(utstyr => (
                      <tr key={utstyr.v_id}>
                        <td className="text-center">{utstyr.v_id}</td>
                        <td>{utstyr.type}</td>
                        <td className="text-center">{utstyr.pris}</td>
                        <Form.Check
                          id={utstyr.v_id}
                          value={utstyr.pris}
                          onClick={e => (this.v_id = e.target.id) && (this.pris = parseInt(e.target.value))}
                          className="text-center"
                          onChange={e => {
                            this.leggTil(e);
                          }}
                        />
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : null}
          </Col>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
                  <div className="valgtvarer">
                    <Table striped bordered hover size="sm" xs={3}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th className="text-center">Pris</th>
                          <th className="text-center">Fjern</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.vareListe.map(vare => (
                          <tr key={vare.v_id}>
                            <td>{vare.type}</td>
                            <td className="text-center">{vare.pris}</td>
                            <div className="text-center">
                              <Button
                                value={vare.v_id}
                                id={vare.pris}
                                onClick={e =>
                                  (this.v_id = e.target.value) && (this.pris = parseInt(e.target.id)) && this.fjern(e)
                                }
                              >
                                Fjern
                              </Button>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <ListGroup.Item>
                  <Row>
                  <Col>
                  <div>Rabatt:</div>
                  </Col>
                  <Col>
                  <div id="rabatt" />
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                  <div>Pris:</div>
                  </Col>
                  <Col>
                  <div id="pris" />
                  </Col>
                  </Row>
                  <br/>
                  <Button onClick={this.visBestillingPop}>Ny bestilling</Button>
                  </ListGroup.Item>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
        </Row>
        <Modal show={this.state.bestillingPop} onHide={this.skjulBestillingPop}>
          <Modal.Header closeButton>
            <Modal.Title>Bestilling</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div className="align-center">
                  Mobilnummer: {this.mobilnummer} <br />
                  <br />
                  Fra: {this.fra} <br />
                  Til: {this.til} <br />
                  Hentested: {this.henting} <br />
                  Leveringssted: {this.levering} <br />
                  <br />
                  Rabatt: {this.rabatt} kroner <br />
                  Total sum: {this.totalSum} kroner
                </div>
              </Col>
              <Col>
                <div className='bekreftelse'>
                  <Table striped bordered hover size="sm" xs={2}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th className="text-center">Pris</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.vareListe.map(vare => (
                        <tr key={vare.v_id}>
                          <td>{vare.type}</td>
                          <td className="text-center">{vare.pris}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulBestillingPop}>
              Gå tilbake
            </Button>
            <Button variant="primary" onClick={this.nyBestilling}>
              Fullfør Bestillingen
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.kundePop} onHide={this.skjulKundePop}>
          <Modal.Header closeButton>
            <Modal.Title>Kunde</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Navn: {this.navn} <br />
            Email: {this.email} <br />
            Mobilnummer: {this.mobilnummer} <br />
            <br />
            Er lagt til i systemet!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulKundePop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.fullførtPop} onHide={this.skjulFullførtPop}>
          <Modal.Header closeButton>
            <Modal.Title>Bestilling</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bestillingen er lagt til i systemet!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulFullførtPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );

  }
  fjern(e) {
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;
    const { idListe } = this.valgt;

    vareListe.pop(this.v_id);
    prisListe.pop(this.pris);
    idListe.pop(this.v_id);

    console.log(this.vareListe);
    console.log(this.prisListe);
    console.log(this.idListe);

    document.getElementById(this.v_id).disabled = false;
    document.getElementById(this.v_id).checked = false;
    this.prisOgRabatt();
  }
  prisOgRabatt() {
    const { prisListe } = this.summer;
    var totalSum = 0;
    var rabatt = 0;

    for (var i = 0; i < prisListe.length; i++) {
      totalSum += prisListe[i];
    }

    if (this.prisListe.length >= 10) {
      rabatt = totalSum * 0.1;
      totalSum = totalSum - rabatt;
    }

    this.rabatt = rabatt;
    this.totalSum = totalSum;
    this.prisListe = prisListe;

    document.getElementById('pris').innerHTML = totalSum;
    document.getElementById('rabatt').innerHTML = rabatt;
  }

  leggTil(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.idListe = idListe;
    this.vareListe = vareListe;
    this.prisListe = prisListe

    idListe.push(this.v_id);
    prisListe.push(this.pris);

    s_sok.infoVarer(this.v_id, varer => {
      this.varer = varer;
      for (var i = 0; i < idListe.length; i++) {
        vareListe.push({ v_id: this.v_id, type: this.varer[i].type, pris: this.varer[i].pris });
      }
    });
    setTimeout(() => {}, 250);

    document.getElementById(this.v_id).disabled = true;

    this.prisOgRabatt();
  }
  mounted() {
    s_hent.Steder(steder => {
      this.steder = steder;
    });
    s_typer.SyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    s_typer.UtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
  }
  nyKunde() {
    s_ny.Kunde(this.navn, this.email, this.mobilnummer);
    this.visKundePop();
  }
  sokKunde() {
    s_sok.Kunde(this.mobilnummer, kunde => {
      this.kundeliste = kunde;
    });
    setTimeout(() => {
      document.getElementById('navnfelt').value = this.kundeliste[0].navn;
      document.getElementById('emailfelt').value = this.kundeliste[0].email;
    }, 250);
  }
  nyBestilling() {
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer, this.rabatt, this.totalSum);

    for (var i = 0; i < this.idListe.length; i++) {
      s_ny.Vareliste(this.idListe[i]);
    }
    this.skjulBestillingPop();
    this.visFullførtPop();
  }

  sokLedigeSyklerType() {
    s_sok.LedigeSyklerType(this.fra, this.til, this.type, sykler => {
      this.sykler = sykler;
    });
    setTimeout(() => {}, 250);
  }

  sokLedigeUtstyrType() {
    s_sok.LedigeUtstyrType(this.fra, this.til, this.type, utstyr => {
      this.utstyr = utstyr;
    });
    setTimeout(() => {}, 250);
  }
}
