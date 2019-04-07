import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup } from 'react-bootstrap';

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

  steder = [];
  typerSykler = [];
  typerUtstyr = [];
  kunde = [];
  sykler = [];
  utstyr = [];
  kundeListe = [];


  render() {
    return (
      <React.Fragment>
        <Row xs={3}>
          <Col xs={3}>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
                  <Form.Label> Mobilnummer: </Form.Label>
                  <Form.Control
                    id="mobilnummer"
                    placeholder="Søk eksisterende mob.nr."
                    type="number"
                    onInput={e => (this.mobilnummer = e.target.value)}
                    onChange={this.sokKunde}
                  />

                  <Form.Label> Navn: </Form.Label>
                  <Form.Control
                    id="navn"
                    value={this.navn}
                    onInput={e => (this.navn = e.target.value)}
                    onChange={this.tomKunde}
                  />

                  <Form.Label> Email: </Form.Label>
                  <Form.Control
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
              <Row xs={6}>
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
                  <Form.Control as="select" onClick={e => (this.type = e.target.value) && this.sokLedigeUtstyrType(e)}>
                    <option hidden>Velg utstyrstype</option>
                    {this.typerUtstyr.map(typerUtstyr => (
                      <option key={typerUtstyr.type} value={typerUtstyr.type}>
                        {typerUtstyr.type}
                      </option>
                    ))}
                  </Form.Control>
                  <br />
                </Col>
                <Col sm="2.8">
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
                    <br />
                    <Button id="nyBestilling" onClick={this.sjekkBestilling}>
                      Ny bestilling
                    </Button>
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
                </Form.Control>
              </Col>
              <Col>
                <Button onClick={this.sokLedigeUtstyr}>Utstyr</Button>

                <Form.Label>Type utstyr:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.sokLedigeUtstyrType}
                  onInput={e => (this.type = e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Velg type her
                  </option>
                  {this.typerUtstyr.map(typerUtstyr => (
                    <option key={typerUtstyr.type} value={typerUtstyr.type}>
                      {typerUtstyr.type}
                    </option>
                  ))}
                  <br />
                </Form.Control>
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

        <Modal size="sm" show={this.state.tomPop} onHide={this.skjulTomPop}>
          <Modal.Header closeButton>
            <Modal.Title>Feil!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Denne bestillingen har mangler!</Modal.Body>
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
          <Modal.Body>Informasjon om restriksjoner</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulResPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  sjekkBestilling() {
    document.getElementById('navn').value = document.getElementById('navn').placeholder;
    document.getElementById('email').value = document.getElementById('email').placeholder;

    this.navn = document.getElementById('navn').value;
    this.email = document.getElementById('email').value;

    let mobilnummer = document.getElementById('mobilnummer').value;
    let navn = document.getElementById('navn').value;
    let email = document.getElementById('email').value;
    let fra = document.getElementById('fra').value;
    let til = document.getElementById('til').value;

    const { idListe } = this.valgt;

    if (this.idListe.length === 0 || mobilnummer == '' || navn == '' || email == '' || fra == '' || til == '') {
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

    for (var i = 0; i < this.idListe.length; i++) {
      if (this.idListe[i] == this.v_id) {
        this.idListe.splice(i, 1);
        this.vareListe.splice(i, 1);
        this.prisListe.splice(i, 1);
      }
    }

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

    document.getElementById('pris').innerHTML = totalSum;
    document.getElementById('rabatt').innerHTML = rabatt;
  }

  leggTil(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.idListe = idListe;
    this.vareListe = vareListe;
    this.prisListe = prisListe;

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

    this.beregnDager();
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
    document.getElementById('nyKunde').disabled = true;
    document.getElementById('navn').placeholder = this.navn;
    document.getElementById('email').placeholder = this.email;
    s_hent.KundeAntall(this.mobilnummer, antall => {
      this.antall = antall;
    });
  }
  sokKunde() {
    s_sok.Kunde(this.mobilnummer, kundeSok => {
      this.kundeListe = kundeSok;
    });
    s_hent.KundeAntall(this.mobilnummer, antall => {
      this.antall = antall;
    });
    setTimeout(() => {
      if (this.kundeListe.length == 1) {
        document.getElementById('navn').placeholder = this.kundeListe[0].navn;
        document.getElementById('email').placeholder = this.kundeListe[0].email;

        document.getElementById('navn').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('nyKunde').disabled = true;

        this.sokKunde();
      } else if (this.kundeListe.length == 0) {
        document.getElementById('navn').placeholder = '';
        document.getElementById('email').placeholder = '';

        document.getElementById('navn').value = '';
        document.getElementById('email').value = '';

        document.getElementById('navn').disabled = false;
        document.getElementById('email').disabled = false;
      }
    }, 250);
  }
  nyBestilling() {
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer, this.rabatt, this.totalSum);

    for (var i = 0; i < this.idListe.length; i++) {
      s_ny.Vareliste(this.idListe[i]);
    }
    this.skjulBestillingPop();
    this.visFullførtPop();

    this.resert();
  }
  sokLedigeSyklerType() {
    s_sok.LedigeSyklerType(this.fra, this.til, this.type, sykler => {
      this.sykler = sykler;
    });
    setTimeout(() => {}, 250);
  }
  sokLedigeUtstyr() {
    s_sok.LedigeUtstyr(this.fra, this.til, utstyr => {
      this.utstyr = utstyr;
    });
    setTimeout(() => {}, 250);
  }
  sokLedigeUtstyrType() {
    s_sok.LedigeUtstyrType(this.fra, this.til, this.type, utstyr => {
      this.utstyr = utstyr;
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
  reset() {
    this.til = '';
    this.fra = '';
    this.idListe = [];
    this.steder = [];
    this.typerSykler = [];
    this.typerUtstyr = [];
    this.kunde = [];
    this.sykler = [];
    this.utstyr = [];
    this.kundeListe = [];

    this.v_id = [];

    this.prisListe = [];
    this.vareListe = [];

    this.varer = [];

    this.totalSum = [];

    document.getElementById('navn').placeholder = '';
    document.getElementById('email').placeholder = '';

    document.getElementById('navn').value = '';
    document.getElementById('email').value = '';

    document.getElementById('navn').disabled = false;
    document.getElementById('email').disabled = false;
  }
}
