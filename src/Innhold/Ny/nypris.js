import * as React from 'react';
import { s_ny, s_hent, s_endre } from './../../services';
import { ListGroup, Form, Row, Col, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

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

  render() {
    return [
      <React.Fragment>
        <Row>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Form.Label>Type Utstyr:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
                {this.typerUtstyr.map(typeUtstyr => (
                  <option key={typeUtstyr.type} value={typeUtstyr.type}>
                    {typeUtstyr.type}
                  </option>
                ))}
                <br />
              </Form.Control>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.pris = e.target.value)} placeholder="00,00" />
              <br />
              <Button value={this.nyPrisUtstyr()} onClick={() => this.visEndringPop()}>
                Legg til ny utstyr pris
              </Button>
            </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup.Item className="list-group-item">
              <Form.Label>Type sykkel:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
                <br />
              </Form.Control>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.pris = e.target.value)} placeholder="00,00" />
              <br />
              <Button value={this.nyPrisSykkel()} onClick={() => this.visEndringPop()}>
                Legg til ny sykkel pris
              </Button>
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
    });

    s_hent.typeUtstyr(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
  }
  nyPrisSykkel() {
    s_endre.PrisSykkel(this.pris, this.type);
  }
  nyPrisUtstyr() {
    s_endre.PrisUtstyr(this.pris, this.type);
  }
}
