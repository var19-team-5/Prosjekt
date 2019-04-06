import * as React from 'react';
import { s_ny, s_hent, s_endre, s_sok } from './../../services';
import { ListGroup, Form, Row, Col, Button, InputGroup, FormControl, Modal, Table } from 'react-bootstrap';

import { Ny } from './nav';

export class NyPris extends Ny {
  constructor(props, context) {
    super(props, context);
    this.visEndringPop = this.visEndringPop.bind(this);
    this.skjulEndringPop = this.skjulEndringPop.bind(this);

    this.state = {
      endringPop: false
    };
  }
  skjulEndringPop() {
    this.setState({ endringPop: false });
  }

  visEndringPop() {
    this.setState({ endringPop: true });
  }
  typerSykler = [];
  typerUtstyr = [];
  prisVarer = [];

  render() {
    return [
      <React.Fragment>
        <Row>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Form.Label>Type sykkel:</Form.Label>
              <Form.Control
                id="sykkelType"
                as="select"
                onChange={e => (this.type = e.target.value) && this.sokPrisSykkel()}
              >
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
                <br />
              </Form.Control>
              <Form.Label>Pris:</Form.Label>
              <Form.Control id="sykkelPris" type="number" onChange={e => (this.pris = e.target.value)} />
              <br />
              <Button onClick={this.nyPrisSykkel}>Endre pris</Button>
            </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Form.Label>Type Utstyr:</Form.Label>
              <Form.Control
                id="utstyrType"
                as="select"
                onChange={e => (this.type = e.target.value) && this.sokPrisUtstyr()}
              >
                {this.typerUtstyr.map(typeUtstyr => (
                  <option key={typeUtstyr.type} value={typeUtstyr.type}>
                    {typeUtstyr.type}
                  </option>
                ))}
                <br />
              </Form.Control>
              <Form.Label>Pris:</Form.Label>
              <Form.Control id="utstyrPris" type="number" onChange={e => (this.pris = e.target.value)} />
              <br />
              <Button onClick={this.nyPrisUtstyr}>Endre pris</Button>
            </ListGroup.Item>
          </Col>
        </Row>

        <Modal size="sm" show={this.state.endringPop} onHide={this.skjulEndringPop}>
          <Modal.Header closeButton>
            <Modal.Title>Oppdatert pris!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Type: {this.type} <br />
            Pris: {this.pris} <br />
            <br />
            Er endret i systemet!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulEndringPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    ];
  }

  mounted() {
    s_hent.typeSykkel(typerSykler => {
      this.typerSykler = typerSykler;
      document.getElementById('sykkelType').value = this.typerSykler[0].type;
      document.getElementById('sykkelPris').placeholder = this.typerSykler[0].pris;
    });
    s_hent.typeUtstyr(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      document.getElementById('utstyrType').value = this.typerUtstyr[0].type;
      document.getElementById('utstyrPris').placeholder = this.typerUtstyr[0].pris;
    });
  }

  nyPrisSykkel() {
    s_endre.PrisSykkel(this.pris, this.type);
    this.visEndringPop();
    this.sokPrisSykkel();
    document.getElementById('sykkelPris').value = '';
  }
  nyPrisUtstyr() {
    s_endre.PrisUtstyr(this.pris, this.type);
    this.sokPrisUtstyr();
    this.visEndringPop();
    document.getElementById('utstyrPris').value = '';
  }

  sokPrisSykkel() {
    s_sok.sokPris(this.type, sokPris => {
      this.sokPris = sokPris;
      document.getElementById('sykkelPris').placeholder = this.sokPris[0].pris;
    });
  }
  sokPrisUtstyr() {
    s_sok.sokPris(this.type, sokPris => {
      this.sokPris = sokPris;
      document.getElementById('utstyrPris').placeholder = this.sokPris[0].pris;
    });
  }
}
