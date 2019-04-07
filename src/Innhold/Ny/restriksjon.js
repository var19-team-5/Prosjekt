import * as React from 'react';
import { s_typer, s_ny, s_hent, s_slett } from './../../services';
import { s_restrikasjon } from './_n_services';
import { ListGroup, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';

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
    s_typer.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
  }
  kjør() {
    this.passendeUtstyr();
    this.upassendeUtstyr();
    console.log(this.minusUtstyr);
    console.log(this.plussUtstyr);
  }
  passendeUtstyr() {
    s_hent.hentPassendeUtstyr(this.type, this.type, this.s_type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
    setTimeout(() => {}, 250);
  }
  upassendeUtstyr() {
    s_hent.hentUpassendeUtstyr(this.type, this.u_type, this.s_type, this.kategori, plussUtstyr => {
      this.plussUtstyr = plussUtstyr;
    });
    setTimeout(() => {}, 250);
  }
  fjernUtstyr() {
    this.plussUtstyr.push(this.type);
    s_slett.fjernPassendeUtstyr(this.props.match.params.type, type, () => {
      s_hent.hentPassendeUtstyr(this.props.match.params.type, utstyr => {
        this.minusUtstyr = minusUtstyr;
      });
    });
  }
  leggTilUtstyr() {
    this.minusUtstyr.push(this.type);
    s_slett.leggTilPassendeUtstyr(this.props.match.params.type, type, () => {
      s_hent.hentUpassendeUtstyr(this.props.match.params.type, utstyr => {
        this.plussUtstyr = plussUtstyr;
      });
    });
  }
}
