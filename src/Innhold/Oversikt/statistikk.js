import * as React from 'react';
import { s_salg } from './_o_services';
import { ListGroup, Col, Button, Form, Row } from 'react-bootstrap';

import { Oversikt } from './nav';
export class Statistikk extends Oversikt {
  salg = [];
  kunder = [];
  sykler = [];
  varer = [];
  sum = [];
  lager = [];
  savnet = [];
  trengerrep = [];
  pårep = [];
  transp = [];

  render() {
    return [
      <React.Fragment>
      <ListGroup.Item className="list-group-item">
      <h5>Statistikk:</h5>
      <br/>
      <ListGroup.Item className="list-group-item">
        <Row>
        <Col className="text-center" xs={2}>
          <Form.Label>Sum bestillinger:</Form.Label>
          {this.sum.map(sum => (
            <div key={sum.sum}>{sum.sum}</div>
          ))}
        </Col>
        <Col className="text-center" xs={2}>
            <Form.Label>Antall bestillinger:</Form.Label>
            {this.salg.map(salg => (
              <div key={salg.salg}>{salg.salg}</div>
            ))}
          </Col>
          <Col className="text-center" xs={2}>
            <Form.Label>Antall kunder:</Form.Label>
            {this.kunder.map(kunder => (
              <div key={kunder.kunder}>{kunder.kunder}</div>
            ))}
          </Col>
          <Col className="text-center" xs={2}>
            <Form.Label>Antall sykler:</Form.Label>
            {this.sykler.map(sykler => (
              <div key={sykler.sykler}>{sykler.sykler}</div>
            ))}
          </Col>
          <Col className="text-center" xs={2}>
            <Form.Label>Antall varer:</Form.Label>
            {this.varer.map(varer => (
              <div key={varer.varer}>{varer.varer}</div>
            ))}
          </Col>
          </Row>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }

  mounted() {
    s_salg.antallBestillinger(salg => {
      this.salg = salg;
    });
    s_salg.sumBestillinger(sum => {
      this.sum = sum;
    });
    s_salg.antallKunder(kunder => {
      this.kunder = kunder;
    });
    s_salg.antallSykler(sykler => {
      this.sykler = sykler;
    });
    s_salg.antallVarer(varer => {
      this.varer = varer;
    });
  }
}
