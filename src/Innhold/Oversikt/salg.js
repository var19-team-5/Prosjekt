import * as React from 'react';
import { s_salg } from './_o_services';
import { ListGroup, Col, Button, Form, Row } from 'react-bootstrap';

import { Oversikt } from './nav';
export class Salg extends Oversikt {
  salg = [];
  kunder = [];
  sykler = [];
  srep = [];
  sum = [];

  render() {
    return [
      <React.Fragment>
      <ListGroup.Item className="list-group-item">
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
      </ListGroup.Item>
      </React.Fragment>
    ];
  }

  mounted() {
    s_salg.antallBestillinger(salg => {
      this.salg = salg;
    });
    s_salg.antallKunder(kunder => {
      this.kunder = kunder;
    });
    s_salg.antallSykler(sykler => {
      this.sykler = sykler;
    });
    s_salg.antallSyklerRep(srep => {
      this.srep = srep;
    });
    s_salg.sumBestillinger(sum => {
      this.sum = sum;
    });
  }
}
