import * as React from 'react';
import { s_salg } from './_o_services';
import { ListGroup, Col, Button, Form, Row } from 'react-bootstrap';

import { Oversikt } from './nav';
export class Statusvarer extends Oversikt {
  lager = [];
  savnet = [];
  trengerrep = [];
  pårep = [];
  transp = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
        <h5>Status varer:</h5>
        <br/>
        <ListGroup.Item className="list-group-item">
        <Row>
        <Col className="text-center" xs={2}>
          <Form.Label>På lager:</Form.Label>
          {this.lager.map(lager => (
            <div key={lager.lager}>{lager.lager}</div>
          ))}
        </Col>
        <Col className="text-center" xs={2}>
          <Form.Label>Savnet:</Form.Label>
          {this.savnet.map(savnet => (
            <div key={savnet.savnet}>{savnet.savnet}</div>
          ))}
        </Col>
        <Col className="text-center" xs={2}>
          <Form.Label>Trenger reparasjon:</Form.Label>
          {this.trengerrep.map(trengerrep => (
            <div key={trengerrep.trengerrep}>{trengerrep.trengerrep}</div>
          ))}
        </Col>
        <Col className="text-center" xs={2}>
          <Form.Label>På reparasjon:</Form.Label>
          {this.pårep.map(pårep => (
            <div key={pårep.pårep}>{pårep.pårep}</div>
          ))}
        </Col>
        <Col className="text-center" xs={2}>
          <Form.Label>Transporteres:</Form.Label>
          {this.transp.map(transp => (
            <div key={transp.transp}>{transp.transp}</div>
          ))}
        </Col>
        </Row>
        </ListGroup.Item>
      </ListGroup.Item>
      </React.Fragment>
    ];
  }

  mounted() {
    s_salg.antallPåLager(lager => {
      this.lager = lager;
    });
    s_salg.antallSavnet(savnet => {
      this.savnet = savnet;
    });
    s_salg.trengerReparasjon(trengerrep => {
      this.trengerrep = trengerrep;
    });
    s_salg.antallPåReparasjon(pårep => {
      this.pårep = pårep;
    });
    s_salg.antallTransporteres(transp => {
      this.transp = transp;
    });
  }
}
