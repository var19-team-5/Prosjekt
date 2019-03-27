import * as React from 'react';
import { s_ny, s_sok, s_typer, s_hent } from './../../services';
import { Col, Button, Form, Row } from 'react-bootstrap';

import { Oversikt } from './nav';
export class SalgsOversikt extends Oversikt {
  salg = [];
  kunder = [];
  sykler = [];
  srep = [];
  sum = [];

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
            <Form.Label>Antall Sykler:</Form.Label>
            {this.sykler.map(sykler => (
              <div key={sykler.sykler}>{sykler.sykler}</div>
            ))}
          </Col>
          <Col className="text-center" xs={2}>
            <Form.Label>Sykler på reparasjon:</Form.Label>
            {this.srep.map(srep => (
              <div key={srep.srep}>{srep.srep}</div>
            ))}
          </Col>
          <Col className="text-center" xs={2}>
            <Form.Label>Sum bestillinger:</Form.Label>
            {this.sum.map(sum => (
              <div key={sum.sum}>{sum.sum}</div>
            ))}
          </Col>
        </Row>
      </React.Fragment>
    ];
  }

  mounted() {
    s_sok.antallBestillinger(salg => {
      this.salg = salg;
    });
    s_sok.antallKunder(kunder => {
      this.kunder = kunder;
    });
    s_sok.antallSykler(sykler => {
      this.sykler = sykler;
    });
    s_sok.antallSyklerRep(srep => {
      this.srep = srep;
    });
    s_sok.sumBestillinger(sum => {
      this.sum = sum;
    });
  }
}
