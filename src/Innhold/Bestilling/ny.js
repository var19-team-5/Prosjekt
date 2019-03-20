import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Row, Col, Button, Form, FormControl, ListGroup, Table } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingNy extends Bestilling {
  navn = '';
  email = '';
  mobilnummer = '';

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
                <br />
              </Col>
              <Col>
                <Form.Label> Navn: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="navnfelt"
                  value={this.navn}
                  onChange={e => (this.navn = e.target.value)}
                />
              </Col>
              <Col>
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
                <Form.Label>Type sykkel:</Form.Label>

                <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
                  <option value="" disabled selected hidden>
                    Velg type her
                  </option>
                  {this.typerSykler.map(typeSykkel => (
                    <option key={typeSykkel.type} value={typeSykkel.type}>
                      {typeSykkel.type}
                    </option>
                  ))}
                  <br />
                </Form.Control>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Vare ID</th>
                      <th>Type</th>
                      <th>ramme</th>
                      <th>girsystem</th>
                      <th>størreslse på hjul</th>
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
              </Col>
              <Col>
                <Form.Label>Type utstyr:</Form.Label>
                <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
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
              </Col>
            </Row>
          </ListGroup.Item>

      </Col>
      </Row>
      </React.Fragment>
    );
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
}
