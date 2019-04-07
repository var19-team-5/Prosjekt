import * as React from 'react';
import { s_ny, s_hent, s_typer } from './../../services';
import { s_vare, s_utstyr } from './_n_services';
import { ListGroup, Form, Row, Col, Button, Modal } from 'react-bootstrap';

import { Ny } from './nav';

export class Utstyr extends Ny {
  constructor(props, context) {
    super(props, context);

    this.visNyType = this.visNyType.bind(this);
    this.skjulNyType = this.skjulNyType.bind(this);

    this.visBekNY = this.visBekNY.bind(this);
    this.skjulBekNY = this.skjulBekNY.bind(this);

    this.visBek = this.visBek.bind(this);
    this.skjulBek = this.skjulBek.bind(this);

    this.visSam = this.visSam.bind(this);
    this.skjulSam = this.skjulSam.bind(this);

    this.state = {
      nytypepop: false,
      bekpopNY: false,
      bekpop: false,
      sampop: false
    };
  }

  skjulNyType() {
    this.setState({ nytypepop: false });
  }

  visNyType() {
    this.setState({ nytypepop: true });
  }

  skjulBekNY() {
    this.setState({ bekpopNY: false });
  }

  visBekNY() {
    this.setState({ bekpopNY: true });
  }

  skjulBek() {
    this.setState({ bekpop: false });
  }

  visBek() {
    this.setState({ bekpop: true });
  }

  skjulSam() {
    this.setState({ sampop: false });
  }

  visSam() {
    this.setState({ sampop: true });
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
                <Form.Control id="antall" type="number" onChange={e => (this.antall = e.target.value)} />
              </Col>
            </Row>
            <br />
            <Button id="ny" onClick={this.visSam}>
              Legg til nytt utstyr
            </Button>
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
                <Form.Control onChange={this.sjekk} onInput={e => (this.nytype = e.target.value)} />
              </Col>
              <Col>
                <Form.Label>Pris:</Form.Label>
                <Form.Control type="number" onChange={this.sjekk} onInput={e => (this.nypris = e.target.value)} />
                <br />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulNyType}>
              Gå tilbake
            </Button>
            <Button id="nyType" onClick={this.nyTypeUtstyr}>
              Legg til ny type
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="sm" centered show={this.state.bekpopNY} onHide={this.skjulBekNY}>
          <Modal.Header closeButton>
            <Modal.Title>Ny type</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ny type er lagt til!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulBekNY}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="sm" centered show={this.state.sampop} onHide={this.skjulSam}>
          <Modal.Header closeButton>
            <Modal.Title>Ny type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Type: {this.type} <br />
            Tilhører: {this.tilhører} <br />
            <br />
            Antall: {this.antall}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulSam}>
              Gå tilbake
            </Button>
            <Button onClick={this.nyUtstyr}>Legg til</Button>
          </Modal.Footer>
        </Modal>

        <Modal size="sm" centered show={this.state.bekpop} onHide={this.skjulBek}>
          <Modal.Header closeButton>
            <Modal.Title>Nye utstyr!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Nye utstyr er lagt til!</Modal.Body>
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
    s_typer.AlleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = this.typerUtstyr[0].type;
    });
    s_hent.Steder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  sjekk() {
    if (this.nytype == '' || this.nypris == '') {
      document.getElementById('nyType').disabled = true;
    } else {
      document.getElementById('nyType').disabled = false;
    }
  }
  nyUtstyr() {
    for (var i = 0; i < this.antall; i++) {
      s_vare.NyVare(this.tilhører, this.type);
      s_utstyr.NyUtstyr(this.type);
      this.skjulSam();
      this.visBek();
      this.mounted();
    }
  }
  nyTypeUtstyr() {
    s_utstyr.NyTypeUtstyr(this.nytype, this.nypris);
    this.skjulNyType();
    this.visBekNY();
    this.mounted();
    this.mounted();
  }
}
