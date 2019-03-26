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

  render() {
    const { valgt } = this.state;
    const { prisListe } = this.summer;
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
              <Button onClick={this.nyBestilling}>Ny bestilling</Button>
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
                    <option value="" disabled selected hidden>
                      Velg type her
                    </option>
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
                    <option value="" disabled selected hidden>
                      Velg type her
                    </option>
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
                <tbody scrollable>
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
                        value={sykkel.type}
                        onClick={e => (this.type = e.target.value) && (this.pris = parseInt(e.target.id))}
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
                        value={utstyr.type}
                        onClick={e => (this.type = e.target.value) && (this.pris = parseInt(e.target.id))}
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
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th className="text-center">Pris</th>
                </tr>
              </thead>
              <tbody>
                {this.typeListe.map(valg => (
                  <tr>
                    <td>{valg}</td>
                    <td className="text-center">{valg}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5>Den totale summen i kr:</h5>
            <div id="pris" />
          </Col>
        </Row>
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
  }

  test(e) {
    const { typeListe } = this.valgt;
    typeListe.push(this.type);

    this.typeListe = typeListe;
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
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer);
  }
  sokLedigeSyklerType() {
    s_sok.LedigeSyklerType(this.fra, this.til, this.type, sykler => {
      this.sykler = sykler;
      console.log(this.fra);
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
