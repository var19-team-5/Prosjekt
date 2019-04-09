import * as React from 'react';
import { s_typer, s_hent } from './../../services';
import { s_ny, s_info, s_sok, s_ledige, s_restriksjon } from './_bn_services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

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

    this.visTomPop = this.visTomPop.bind(this);
    this.skjulTomPop = this.skjulTomPop.bind(this);

    this.visResPop = this.visResPop.bind(this);
    this.skjulResPop = this.skjulResPop.bind(this);

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
      fullførtPop: false,
      tomPop: false,
      resPop: false
    };
  }

  skjulBestillingPop() {
    this.setState({ bestillingPop: false });
  }

  visBestillingPop() {
    this.setState({ bestillingPop: true });
  }

  skjulTomPop() {
    this.setState({ tomPop: false });
  }

  visTomPop() {
    this.setState({ tomPop: true });
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

  skjulResPop() {
    this.setState({ resPop: false });
  }

  visResPop() {
    this.setState({ resPop: true });
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
  til2 = '';
  fra2 = '';
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

  typerSykler = [];
  minusUtstyr = [];
  type = [];

  render() {
    const { idListe } = this.valgt;
    const { prisListe } = this.summer;
    const { vareListe } = this.varerx;

    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col xs={3}>
              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    <Form.Label> Mobilnummer: </Form.Label>
                    <Form.Control
                      id="mobilnummer"
                      placeholder="Søk mobilnummer"
                      type="number"
                      onInput={e => (this.mobilnummer = e.target.value)}
                      onChange={this.sokKunde}
                    />

                    <Form.Label> Navn: </Form.Label>
                    <Form.Control
                      placeholder="Fornavn Etternavn"
                      id="navn"
                      value={this.navn}
                      onInput={e => (this.navn = e.target.value)}
                      onChange={this.tomKunde}
                    />

                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                      placeholder="eksempel@email.com"
                      id="email"
                      value={this.email}
                      onInput={e => (this.email = e.target.value)}
                      onChange={this.tomKunde}
                    />
                  </Col>
                </Row>
                <br />
                <Button id="nyKunde" onClick={this.nyKunde}>
                  Ny kunde
                </Button>
              </ListGroup.Item>

              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    <Form.Label> Fra: </Form.Label>
                    <Form.Control id="fra" required type="datetime-local" onChange={e => (this.fra = e.target.value)} />
                  </Col>
                  <Col>
                    <Form.Label> Til: </Form.Label>
                    <Form.Control id="til" required type="datetime-local" onChange={e => (this.til = e.target.value)} />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    <Form.Label>Hentested:</Form.Label>
                    <Form.Control id="henting" as="select" onChange={e => (this.henting = e.target.value)}>
                      {this.steder.map(sted => (
                        <option key={sted.l_id}>{sted.lokasjon}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Leveringsted:</Form.Label>
                    <Form.Control id="levering" as="select" onChange={e => (this.levering = e.target.value)}>
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
                <Row>
                  <Col>
                    <Form.Control
                      id="s_type"
                      as="select"
                      onClick={e => (this.type = e.target.value) && this.sokLedigeSyklerType(e)}
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
                      onClick={e => (this.type = e.target.value) && this.sokLedigeUtstyrType(e)}
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
                  <Col>
                    <div className="align-center">
                      <Button onClick={this.visResPop} id="restriksjoner">
                        Restriksjoner
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              {this.state.vSykkel ? (
                <div className="table">
                  <Table striped bordered hover size="sm">
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
                            onClick={e => (this.v_id = parseInt(e.target.id)) && (this.pris = parseInt(e.target.value))}
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
                  <Table striped bordered hover size="sm">
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
            <Col xs={3}>
              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    <div className="valgtvarer">
                      <Table striped bordered hover size="sm">
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
                          <div>Antall varer:</div>
                        </Col>
                        <Col>
                          <div> {this.prisListe.length} </div>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>Rabatt:</div>
                        </Col>
                        <Col>
                          <div>{this.rabatt}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>Pris:</div>
                        </Col>
                        <Col>
                          <div> {this.totalSum} </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          <Button id="nyBestilling" onClick={this.sjekkBestilling}>
                            Ny bestilling
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="danger" onClick={this.reset}>
                            Nullstill
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
          </Row>
          <Modal centered size="lg" show={this.state.bestillingPop} onHide={this.skjulBestillingPop}>
            <Modal.Header closeButton>
              <Modal.Title>Bestilling</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <div className="align-center">
                    Navn: {this.navn} <br />
                    Email: {this.email} <br />
                    Mobilnummer: {this.mobilnummer} <br />
                    <br />
                    Fra: {this.fra2} <br />
                    Til: {this.til2} <br />
                    Hentested: {this.henting} <br />
                    Leveringssted: {this.levering} <br />
                    <br />
                    Rabatt: {this.rabatt} kroner <br />
                    Total sum: {this.totalSum} kroner
                  </div>
                </Col>
                <Col>
                  <div className="bekreftelse">
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
          <Modal size="sm" centered show={this.state.kundePop} onHide={this.skjulKundePop}>
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

          <Modal size="sm" show={this.state.fullførtPop} onHide={this.skjulFullførtPop}>
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

          <Modal centered size="md" show={this.state.tomPop} onHide={this.skjulTomPop}>
            <Modal.Header closeButton>
              <Modal.Title>Feil!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Denne bestillingen har feil eller mangler! <br />
              <br />
              Dette kan være:
              <ul>
                <li> Manglende informasjon om kunden </li>
                <li> Manglende dato </li>
                <li> Startdato er før sluttdato </li>
                <li> Bestillingen har ikke noe innhold </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulTomPop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal centered size="lg" show={this.state.resPop} onHide={this.skjulResPop}>
            <Modal.Header closeButton>
              <Modal.Title>Restriksjoner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.passendeUtstyr(e)}>
                    {this.typerSykler.map(typeSykkel => (
                      <option key={typeSykkel.type} value={typeSykkel.type}>
                        {typeSykkel.type}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <div className="restr">
                    <Table striped bordered hover size="sm" xs={4}>
                      <thead>
                        <tr>
                          <th>Passer til</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.minusUtstyr.map(utstyr => (
                          <tr key={utstyr.type}>
                            <td>{utstyr.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulResPop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      </React.Fragment>
    );
  }

  sjekkBestilling() {
    this.navn = document.getElementById('navn').value;
    this.email = document.getElementById('email').value;

    let mobilnummer = document.getElementById('mobilnummer').value;
    let navn = document.getElementById('navn').value;
    let email = document.getElementById('email').value;
    let fra = document.getElementById('fra').value;
    let til = document.getElementById('til').value;

    const { idListe } = this.valgt;

    this.fra2 = this.fra.replace('T', ' ');
    this.til2 = this.til.replace('T', ' ');

    if (
      this.idListe.length === 0 ||
      mobilnummer == '' ||
      navn == '' ||
      email == '' ||
      fra == '' ||
      til == '' ||
      this.fra >= this.til
    ) {
      this.visTomPop();
    } else {
      this.visBestillingPop();
    }
  }

  tomKunde() {
    let mobilnummer = document.getElementById('mobilnummer').value;
    let navn = document.getElementById('navn').value;
    let email = document.getElementById('email').value;

    if (mobilnummer == '' || navn == '' || email == '') {
      document.getElementById('nyKunde').disabled = true;
    } else {
      document.getElementById('nyKunde').disabled = false;
    }
  }
  fjern(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    for (var j = 0; j < this.utstyr.length; j++) {
      if (this.utstyr[j].v_id == this.v_id) {
        document.getElementById(this.v_id).disabled = false;
        document.getElementById(this.v_id).checked = false;
      }
    }

    for (var k = 0; k < this.sykler.length; k++) {
      if (this.sykler[k].v_id == this.v_id) {
        document.getElementById(this.v_id).disabled = false;
        document.getElementById(this.v_id).checked = false;
      }
    }

    for (var i = 0; i < this.idListe.length; i++) {
      if (this.idListe[i] == this.v_id) {
        this.idListe.splice(i, 1);
        this.vareListe.splice(i, 1);
        this.prisListe.splice(i, 1);
      }
    }
    this.beregnDager();
    this.prisOgRabatt();
  }
  prisOgRabatt() {
    const { prisListe } = this.summer;
    var totalSum = 0;
    var rabatt = 0;

    for (var i = 0; i < prisListe.length; i++) {
      totalSum += prisListe[i];
    }

    totalSum = totalSum * this.dager;

    if (this.prisListe.length >= 10 || this.antall[0].antall >= 10) {
      rabatt = totalSum * 0.1;
      totalSum = totalSum - rabatt;
    }

    this.rabatt = rabatt;
    this.totalSum = totalSum;
    this.prisListe = prisListe;

    console.log(this.totalSum);
    console.log(this.rabatt);
  }

  leggTil(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    idListe.push(this.v_id);
    console.log(this.idListe);
    prisListe.push(this.pris);
    console.log(this.prisListe);

    s_info.Varer(this.v_id, varer => {
      this.varer = varer;
      for (var i = 0; i < idListe.length; i++) {
        vareListe.push({ v_id: this.v_id, type: this.varer[i].type, pris: this.varer[i].pris });
      }
    });
    setTimeout(() => {}, 250);
    document.getElementById(this.v_id).disabled = true;

    this.beregnDager();
    this.prisOgRabatt();
  }
  mounted() {
    s_hent.Steder(steder => {
      this.steder = steder;
      this.henting = this.steder[0].lokasjon;
      this.levering = this.steder[0].lokasjon;
    });
    s_typer.SyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    s_typer.UtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    document.getElementById('nyKunde').disabled = true;

    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.idListe = idListe;
    this.vareListe = vareListe;
    this.prisListe = prisListe;

    s_typer.AlleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = this.typerSykler[0].type;
    });
    this.passendeUtstyr();
  }
  nyKunde() {
    s_ny.Kunde(this.navn, this.email, this.mobilnummer);
    this.visKundePop();
    document.getElementById('nyKunde').disabled = true;
    document.getElementById('navn').placeholder = this.navn;
    document.getElementById('email').placeholder = this.email;
    s_info.AntallBestillinger(this.mobilnummer, antall => {
      this.antall = antall;
    });
  }
  sokKunde() {
    s_sok.Kunde(this.mobilnummer, kundeSok => {
      this.kundeListe = kundeSok;
    });
    s_info.AntallBestillinger(this.mobilnummer, antall => {
      this.antall = antall;
    });
    setTimeout(() => {
      if (this.kundeListe.length == 0) {
        document.getElementById('navn').placeholder = 'Fornavn Etternavn';
        document.getElementById('email').placeholder = 'eksempel@email.com';

        document.getElementById('navn').value = '';
        document.getElementById('email').value = '';

        document.getElementById('navn').disabled = false;
        document.getElementById('email').disabled = false;
        console.log(this.kundeListe.length);
      } else if (this.kundeListe.length == 1) {
        document.getElementById('navn').placeholder = this.kundeListe[0].navn;
        document.getElementById('email').placeholder = this.kundeListe[0].email;

        document.getElementById('navn').value = document.getElementById('navn').placeholder;
        document.getElementById('email').value = document.getElementById('email').placeholder;

        document.getElementById('navn').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('nyKunde').disabled = true;
        console.log(this.kundeListe.length);
      }
    }, 250);
  }

  nyBestilling() {
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer, this.rabatt, this.totalSum);

    for (var i = 0; i < this.idListe.length; i++) {
      s_ny.Varer(this.idListe[i]);
    }
    this.skjulBestillingPop();
    this.visFullførtPop();

    this.reset();
  }

  sokLedigeSyklerType() {
    s_ledige.Sykler(this.fra, this.til, this.type, sykler => {
      this.sykler = sykler;
      this.sjekks();
    });
    setTimeout(() => {}, 250);
    this.operationS();
  }

  sokLedigeUtstyrType() {
    s_ledige.Utstyr(this.fra, this.til, this.type, utstyr => {
      this.utstyr = utstyr;
      this.sjekku();
    });
    setTimeout(() => {}, 250);
    this.operationU();
  }
  sjekks() {
    for (var i = 0; i < this.sykler.length; i++) {
      for (var y = 0; y < this.idListe.length; y++) {
        if (this.sykler[i].v_id == this.idListe[y]) {
          document.getElementById(this.idListe[y]).disabled = true;
          document.getElementById(this.idListe[y]).checked = true;
        }
      }
    }
  }

  sjekku() {
    for (var i = 0; i < this.utstyr.length; i++) {
      for (var y = 0; y < this.idListe.length; y++) {
        if (this.utstyr[i].v_id == this.idListe[y]) {
          document.getElementById(this.idListe[y]).disabled = true;
          document.getElementById(this.idListe[y]).checked = true;
        }
      }
    }
  }
  beregnDager() {
    var til = new Date(this.til);
    var fra = new Date(this.fra);

    var res = Math.abs(fra - til) / 1000;
    var dager = Math.floor(res / 86400);
    this.dager = dager;

    if (this.dager == 0) {
      this.dager = 1;
    } else if (this.dager >= 7) {
      this.dager = 7;
    }
  }

  passendeUtstyr() {
    s_restriksjon.hentPassendeUtstyr(this.type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
    setTimeout(() => {}, 250);
  }

  reset() {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.fjern = this.prisListe.length;

    for (var m = 0; m < this.fjern; m++) {
      this.idListe.pop(m);
      this.vareListe.pop(m);
      this.prisListe.pop(m);
    }

    this.setState({
      vSykkel: false,
      vUtstyr: false
    });

    this.totalSum = 0;
    this.rabatt = 0;

    this.henting = this.steder[0].lokasjon;
    this.levering = this.steder[0].lokasjon;

    document.getElementById('nyKunde').disabled = true;
    document.getElementById('mobilnummer').value = '';

    this.mobilnummer = '';

    document.getElementById('fra').value = '';
    document.getElementById('til').value = '';

    this.kundeListe = [];

    document.getElementById('henting').value = this.steder[0].lokasjon;
    document.getElementById('levering').value = this.steder[0].lokasjon;

    this.henting = this.steder[0].lokasjon;
    this.levering = this.steder[0].lokasjon;

    document.getElementById('navn').placeholder = 'Fornavn Etternavn';
    document.getElementById('email').placeholder = 'eksempel@email.com';

    document.getElementById('navn').value = '';
    document.getElementById('email').value = '';

    document.getElementById('navn').disabled = false;
    document.getElementById('email').disabled = false;

    this.sokKunde();
    this.prisOgRabatt();
  }
}
