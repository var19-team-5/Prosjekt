import * as React from 'react';
import { s_ny, s_hent, s_typer } from './../../services';
import { ListGroup, Form, Row, Col, Button, Modal } from 'react-bootstrap';

import { Ny } from './nav';

export class NyUtstyr extends Ny {
  constructor(props, context) {
    super(props, context);

    this.visNyType = this.visNyType.bind(this);
    this.skjulNyType = this.skjulNyType.bind(this);

    this.visBek = this.visBek.bind(this);
    this.skjulBek = this.skjulBek.bind(this);

    this.state = {
      nytypepop: false,
      bekpop: false
    };
  }

  skjulNyType() {
    this.setState({ nytypepop: false });
  }

  visNyType() {
    this.setState({ nytypepop: true });
  }

  skjulBek() {
    this.setState({ bekpop: false });
  }

  visBek() {
    this.setState({ bekpop: true });
  }

  steder = [];
  typerUtstyr = [];

  nytype = '';
  nypris = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Form.Label>Type utstyr:</Form.Label>
          <Form.Control id="type" as="select" onChange={e => (this.type = e.target.value)}>
            <option hidden>Velg type</option>
            {this.typerUtstyr.map(typeUtstyr => (
              <option key={typeUtstyr.type} value={typeUtstyr.type}>
                {typeUtstyr.type}
              </option>
            ))}
          </Form.Control>
          <br />
          <Button onClick={this.visNyType}>NY TYPE</Button>
        </ListGroup.Item>

        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label>Tilhører:</Form.Label>
                <Form.Control id="test" as="select" onChange={e => (this.tilhører = e.target.value)}>
                  {this.steder.map(sted => (
                    <option key={sted.lokasjon} value={sted.tilhører}>
                      {sted.lokasjon}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Antall:</Form.Label>
                <Form.Control
                  id="antall"
                  type="number"
                  onChange={e => (this.antall = e.target.value)}
                  placeholder="00"
                />
              </Col>
            </Row>
            <br />
            <Button onClick={this.nyUtstyr}>Legg til nytt utstyr</Button>
          </ListGroup.Item>
        </Form.Group>

        <Modal size="lg" centered show={this.state.nytypepop} onHide={this.skjulNyType}>
          <Modal.Header closeButton>
            <Modal.Title>Ny type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Label>Ny type:</Form.Label>
                <Form.Control onChange={e => (this.nytype = e.target.value)} placeholder="navn" />
              </Col>
              <Col>
                <Form.Label>Pris:</Form.Label>
                <Form.Control type="number" onChange={e => (this.nypris = e.target.value)} placeholder="00,00" />
                <br />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulNyType}>
              Gå tilbake
            </Button>
            <Button onClick={this.nyTypeSykkel}>Legg til ny type</Button>
          </Modal.Footer>
        </Modal>

        <Modal size="sm" centered show={this.state.bekpop} onHide={this.skjulBek}>
          <Modal.Header closeButton>
            <Modal.Title>Ny type</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ny type er lagt til!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulBek}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    ];
  }

  mounted() {
    s_typer.alleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = typerUtstyr[0].type;
    });
    s_hent.Steder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  nySykkel() {
    s_ny.Sykkel(this.tilhører, this.type);
  }
  nyTypeSykkel() {
    s_ny.TypeUtstyr(this.nytype, this.nypris);
    this.skjulNyType();
    this.visBek();
    this.mounted();
  }
}
