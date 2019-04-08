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
  s_type = [];
  u_type = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item" xs={8}>
          <Row>
            <Col xs={8}>
              <Form.Label>Koble sykkel til utstyr:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.kjør(e)}>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <br />
          <Row xs={8}>
            <Col xs={4}>
              <div className="restr">
                <Table striped bordered hover size="sm" xs={4}>
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
            <Col xs={4}>
              <div className="restr">
                <Table striped bordered hover size="sm" xs={4}>
                  <thead>
                    <tr>
                      <th xs={3}>Legg til</th>
                      <th className="text-center" xs={1}>
                        +
                      </th>
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
      this.s_type = this.typerSykler[0].type;
    });
  }
  kjør() {
    this.passendeUtstyr();
    this.upassendeUtstyr();
  }
  passendeUtstyr() {
    s_restriksjon.hentPassendeUtstyr(this.type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
    setTimeout(() => {}, 250);
  }
  upassendeUtstyr() {
    s_restriksjon.hentUpassendeUtstyr(this.type, plussUtstyr => {
      this.plussUtstyr = plussUtstyr;
    });
    setTimeout(() => {}, 250);
  }
  fjernUtstyr() {
    this.plussUtstyr.push(this.type);
    this.minusUtstyr.pop(this.type);

    for (var i = 0; i < this.minusUtstyr.length; i++) {
      if (this.minusUtstyr[i] == this.type) {
        this.minusUtstyr.splice(i, 1);
      }
    }
    s_restriksjon.fjernPassendeUtstyr(this.type, this.u_type);
    this.kjør();
  }

  leggTilUtstyr() {
    this.minusUtstyr.push(this.type);
    this.plussUtstyr.pop(this.type);

    for (var i = 0; i < this.plussUtstyr.length; i++) {
      if (this.plussUtstyr[i] == this.type) {
        this.plussUtstyr.splice(i, 1);
      }
    }

    s_restriksjon.leggTilPassendeUtstyr(this.type, this.u_type);
    this.kjør();
  }
}
