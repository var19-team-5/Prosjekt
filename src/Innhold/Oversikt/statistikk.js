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

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h5>Statistikk:</h5>
          <br />
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col className="text-center" xs={2}>
                <Form.Label>Sum bestillinger:</Form.Label>
                <div>{this.sum}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Antall bestillinger:</Form.Label>
                <div>{this.salg}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Antall kunder:</Form.Label>
                <div>{this.kunder}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Antall sykler:</Form.Label>
                <div>{this.sykler}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Antall varer:</Form.Label>
                <div>{this.varer}</div>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }

  mounted() {
    s_salg.SumBestillinger(sum => {
      this.sum = sum[0].sum;
    });
    s_salg.AntallBestillinger(salg => {
      this.salg = salg[0].salg;
    });
    s_salg.AntallKunder(kunder => {
      this.kunder = kunder[0].kunder;
    });
    s_salg.AntallSykler(sykler => {
      this.sykler = sykler[0].sykler;
    });
    s_salg.AntallVarer(varer => {
      this.varer = varer[0].varer;
    });
  }
}
