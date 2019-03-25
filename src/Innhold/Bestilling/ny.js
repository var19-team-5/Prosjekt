import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingNy extends Bestilling {
  constructor(props) {
    super(props);

    this.state = {
      valgt: []
    };
    this.summer = {
      prisListe: []
    };
  }

  til = '';
  fra = '';
  valgt = [];
  steder = [];
  typerSykler = [];
  typerUtstyr = [];
  kunde = [];
  sykler = [];
  utstyr = [];
  kundeListe = [];

  v_id = []

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
          <Col>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col>
                  <Button onClick={this.sokLedigeSykler}>Sykler</Button>

                  <Form.Label>Type sykkel:</Form.Label>

                  <Form.Control
                    as="select"
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
                  </Form.Control>
                  <br />
                </Col>
              </Row>
            </ListGroup.Item>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">Vare ID</th>
                  <th>Type</th>
                  <th>Ramme</th>
                  <th className="text-center">Girsystem</th>
                  <th className="text-center">Storrelse på hjul</th>
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
                        this.test(e)
                        this.sum(e);
                      }}
                    />
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">Vare ID</th>
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
          </Col>
          <Col>
            <div id="valg" />
            <div id="pris" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  sum(e) {
    const { prisListe } = this.summer;
    console.log(this.summer);

    var totalSum = 0;
      prisListe.push(this.pris);

      for (var i = 0; i < prisListe.length; i++) {
        totalSum += prisListe[i];
      }

    document.getElementById('pris').innerHTML = totalSum + '<br>' + prisListe ;
    console.log(prisListe);

  }
  test(e) {
    const { valgt } = this.state;
      valgt.push(this.type);

    document.getElementById('valg').innerHTML = valgt;
    console.log(valgt);

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
  sokLedigeUtstyr() {
    s_sok.LedigeUtstyrTyper(this.fra, this.til, utstyr => {
      this.utstyr = utstyr;
    });
    setTimeout(() => {}, 250);
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
  }
}
