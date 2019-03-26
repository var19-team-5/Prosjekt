import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import {Col, Button, Form, Row} from 'react-bootstrap';

import { Oversikt } from './nav';
export class SalgsOversikt extends Oversikt {
salg = [];
kunder = [];
  render() {
    return [
      <React.Fragment>
      <Row>
      <Col className="text-center" xs={2}>
      <Form.Label>Antall bestillinger:</Form.Label>
        {this.salg.map(salg => (
          <div key={salg.salg}>{salg.salg}</div>
        ))}
      </Col>
      <Col className="text-center" xs={2}>
      <Form.Label>Antall Kunder:</Form.Label>
        {this.kunder.map(kunder => (
          <div key={kunder.kunder}>{kunder.kunder}</div>
        ))}
      </Col>
      <Col className="text-center" xs={2}>
      <Form.Label>Antall bestillinger:</Form.Label>
        {this.salg.map(salg => (
          <div key={salg.salg}>{salg.salg}</div>
        ))}
      </Col>
      <Col className="text-center" xs={2}>
      <Form.Label>Antall bestillinger:</Form.Label>
        {this.salg.map(salg => (
          <div key={salg.salg}>{salg.salg}</div>
        ))}
      </Col>
      </Row>
      </React.Fragment>

    ];
  }

  mounted() {
    s_sok.antallBestillinger(salg => {
      this.salg = salg;
      console.log(salg)
    });
    s_sok.antallKunder(kunder => {
      this.kunder = kunder;
      console.log(kunder)
    });
  }
}
