import * as React from 'react';
import { s_typer } from './../../services';
import { s_pris } from './_n_services';
import { ListGroup, Form, Row, Col, Button, InputGroup, FormControl, Modal, Table } from 'react-bootstrap';

import { Ny } from './nav';

export class Pris extends Ny {
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
                onChange={e => (this.type = e.target.value) && this.PriserSykkel()}
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
                onChange={e => (this.type = e.target.value) && this.PriserUtstyr()}
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
    s_typer.AlleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = this.typerSykler[0].type;
      document.getElementById('sykkelPris').placeholder = this.typerSykler[0].pris + ',-';
    });
    s_typer.AlleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = this.typerUtstyr[0].type;
      document.getElementById('utstyrPris').placeholder = this.typerUtstyr[0].pris + ',-';
    });
  }

  nyPrisSykkel() {
    s_pris.EndrePris(this.pris, this.type);
    this.visEndringPop();
    this.PriserSykkel();
    document.getElementById('sykkelPris').value = '';
  }
  nyPrisUtstyr() {
    s_pris.EndrePris(this.pris, this.type);
    this.PriserUtstyr();
    this.visEndringPop();
    document.getElementById('utstyrPris').value = '';
  }

  PriserSykkel() {
    s_pris.Priser(this.type, Priser => {
      this.Priser = Priser;
      document.getElementById('sykkelPris').placeholder = this.Priser[0].pris + ',-';
    });
  }
  PriserUtstyr() {
    s_pris.Priser(this.type, Priser => {
      this.Priser = Priser;
      document.getElementById('utstyrPris').placeholder = this.Priser[0].pris + ',-';
    });
  }
}