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
      {/*Opretter en ListGroup for å skille mellom overskriften og innholdet*/}
        <ListGroup.Item className="list-group-item">
          <h5>Status varer:</h5>
          <br />
          {/*Opretter en ListGroup med innhold*/}
          <ListGroup.Item className="list-group-item">
            <Row>
            {/*Hver Col er koblet til hver sin variabel definert i classen*/}
              <Col className="text-center" xs={2}>
                <Form.Label>På lager:</Form.Label>
                <div>{this.lager}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Savnet:</Form.Label>
                <div>{this.savnet}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Trenger reparasjon:</Form.Label>
                <div>{this.trengerrep}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>På reparasjon:</Form.Label>
                <div>{this.pårep}</div>
              </Col>
              <Col className="text-center" xs={2}>
                <Form.Label>Transporteres:</Form.Label>
                <div>{this.transp}</div>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }
  //setter at hver variabel får verdien som hentes ut gjennom en spørring i metoden i _o_services
  mounted() {
    s_salg.AntallPåLager(lager => {
      this.lager = lager[0].lager;
    });
    s_salg.AntallSavnet(savnet => {
      this.savnet = savnet[0].savnet;
    });
    s_salg.AntallTrengerReparasjon(trengerrep => {
      this.trengerrep = trengerrep[0].trengerrep;
    });
    s_salg.AntallPåReparasjon(pårep => {
      this.pårep = pårep[0].pårep;
    });
    s_salg.AntallTransporteres(transp => {
      this.transp = transp[0].transp;
    });
  }
}
