import * as React from 'react';
import { s_typer } from './../../services';
import { s_restriksjon } from './_n_services';
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class Restriksjon extends Ny {
  typerSykler = [];
  minusUtstyr = [];
  plussUtstyr = [];
  type = '';
  s_type = '';
  u_type = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col>
              <Form.Label>Koble sykkel til utstyr:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.kjør(e)}>
                <option hidden>Velg sykkeltype</option>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <div>
              <br />
              <Table striped bordered hover size="sm" xs={6}>
                <thead>
                  <tr>
                    <th>Koblet</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>
                  {this.minusUtstyr.map(utstyr => (
                    <tr key={utstyr.type}>
                      <td>{utstyr.type}</td>
                      <td>
                        <Button onClick={() => this.fjernUtstyr(this.type)}>-</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div>
              <br />
              <Table striped bordered hover size="sm" xs={6}>
                <thead>
                  <tr>
                    <th>Legg til</th>
                    <th>+</th>
                  </tr>
                </thead>
                <tbody>
                  {this.plussUtstyr.map(utstyr => (
                    <tr key={utstyr.type}>
                      <td>{utstyr.type}</td>
                      <td>
                        <Button onClick={() => this.leggTilUtstyr(this.type)}>+</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
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

    s_typer.AlleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.u_type = this.typerUtstyr[0].type;
    });
    setTimeout(() => {}, 250);
  }
  nyRestriksjon() {
    s_restriksjon.NyRestriksjon(this.s_type, this.u_type);
  }
}
