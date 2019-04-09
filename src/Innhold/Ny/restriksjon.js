import * as React from 'react';
import { s_typer } from './../../services';
import { s_restriksjon } from './_n_services';
import { ListGroup, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';

import { Ny } from './nav';

export class Restriksjon extends Ny {
  typerSykler = [];
  minusUtstyr = [];
  plussUtstyr = [];
  type = [];
  u_type = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h5> Koble sykkel til utstyr: </h5>
          <br />
          <Row>
            <Col xs={3}>
              <Form.Label>Velg sykkeltype:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.hent(e)}>
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
              <div className="bekreftelse">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Koblet</th>
                      <th className="text-center">-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.minusUtstyr.map(utstyr => (
                      <tr key={utstyr.type}>
                        <td>{utstyr.type}</td>
                        <td className="text-center">
                          <Button
                            value={utstyr.type}
                            onClick={e => (this.u_type = e.target.value) && this.fjernUtstyr()}
                          >
                            -
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col>
              <div className="bekreftelse">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Legg til</th>
                      <th className="text-center">+</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.plussUtstyr.map(utstyr => (
                      <tr key={utstyr.type}>
                        <td>{utstyr.type}</td>
                        <td className="text-center">
                          <Button
                            value={utstyr.type}
                            onClick={e => (this.u_type = e.target.value) && this.leggTilUtstyr()}
                          >
                            +
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }
  mounted() {
    s_typer.AlleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = this.typerSykler[0].type;
    });
    setTimeout(() => {
      this.hent();
    }, 250);
  }

  hent() {
    this.passendeUtstyr();
    this.upassendeUtstyr();
  }

  passendeUtstyr() {
    s_restriksjon.HentPassendeUtstyr(this.type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
  }

  upassendeUtstyr() {
    s_restriksjon.HentUpassendeUtstyr(this.type, plussUtstyr => {
      this.plussUtstyr = plussUtstyr;
    });
  }

  fjernUtstyr() {
    this.plussUtstyr.push(this.type);
    this.minusUtstyr.pop(this.type);

    for (var i = 0; i < this.minusUtstyr.length; i++) {
      if (this.minusUtstyr[i] == this.type) {
        this.minusUtstyr.splice(i, 1);
      }
    }
    s_restriksjon.FjernPassendeUtstyr(this.type, this.u_type);
    this.hent();
  }

  leggTilUtstyr() {
    this.minusUtstyr.push(this.type);
    this.plussUtstyr.pop(this.type);

    for (var i = 0; i < this.plussUtstyr.length; i++) {
      if (this.plussUtstyr[i] == this.type) {
        this.plussUtstyr.splice(i, 1);
      }
    }
    s_restriksjon.LeggTilPassendeUtstyr(this.type, this.u_type);
    this.hent();
  }
}
