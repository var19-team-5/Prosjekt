import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingNy extends Bestilling {
  constructor(props) {
    super(props);

    this.valgt = {
      typeListe: []
    };
    this.summer = {
      prisListe: []
    };
    this.hei = {
      vareListe: []
    };
    this.state = {
      Sykkel: true,
      Utstyr: false
    };
  }

  operationS() {
    this.setState({
      Sykkel: true,
      Utstyr: false
    });
  }

  operationU() {
    this.setState({
      Sykkel: false,
      Utstyr: true
    });
  }

  til = '';
  fra = '';
  typeListe = [];
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

  totalSum = '';

  render() {
    const { valgt } = this.state;
    const { prisListe } = this.summer;
    const { vareListe } = this.hei;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
                  <Form.Label> Mobilnummer: </Form.Label>
                  <Form.Control
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
                    onChange={e => (this.navn = e.target.value)}
                  />

                  <Form.Label> Email: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="emailfelt"
                    value={this.email}
                    onChange={e => (this.email = e.target.value)}
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
                    onClick={() => this.operationS()}
                    onChange={this.sokLedigeSyklerType}
                    onInput={e => (this.type = e.target.value)}
                  >
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
                    onClick={() => this.operationU()}
                    onChange={this.sokLedigeUtstyrType}
                    onInput={e => (this.type = e.target.value)}
                  >
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
            {this.state.Sykkel ? (
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
                        id={sykkel.pris}
                        value={sykkel.v_id}
                        onClick={e => (this.v_id = e.target.value) && (this.pris = parseInt(e.target.id))}
                        className="text-center"
                        onChange={e => {
                          this.test(e);
                          this.sum(e);
                        }}
                      />
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : null}
            {this.state.Utstyr ? (
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
                        id={utstyr.pris}
                        value={utstyr.v_id}
                        onClick={e => (this.v_id = e.target.value) && (this.pris = parseInt(e.target.id))}
                        className="text-center"
                        onChange={e => {
                          this.test(e);
                          this.sum(e);
                        }}
                      />
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : null}
          </Col>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
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
                            <Button>Fjern</Button>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <h5>Den totale summen i kr:</h5>
                  <div id="pris" />
                  <Button onClick={this.nyBestilling}>Ny bestilling</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
        </Row>
        <div id="ut" />
      </React.Fragment>
    );
  }
  sum(e) {
    const { prisListe } = this.summer;

    var totalSum = 0;
    prisListe.push(this.pris);

    for (var i = 0; i < prisListe.length; i++) {
      totalSum += prisListe[i];
    }
    this.prisListe = prisListe;

    document.getElementById('pris').innerHTML = totalSum;
    this.totalSum = totalSum;
  }

  test(e) {
    const { typeListe } = this.valgt;
    const { vareListe } = this.hei;

    this.typeListe = typeListe;
    this.vareListe = vareListe;

    typeListe.push(this.v_id);

    s_sok.infoVarer(this.v_id, varer => {
      this.varer = varer;
      for (var i = 0; i < typeListe.length; i++) {
        vareListe.push({ v_id: this.varer[i].v_id, type: this.varer[i].type, pris: this.varer[i].pris });
      }
    });
    setTimeout(() => {}, 250);
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
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer, this.totalSum);

    for (var i = 0; i < this.typeListe.length; i++) {
      s_ny.Vareliste(this.typeListe[i]);
    }
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
