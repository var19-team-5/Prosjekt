import * as React from 'react';
import { s_lokasjon } from './_n_services';
import { Form, ListGroup, Button, Modal } from 'react-bootstrap';

import { Ny } from './nav';

export class Lokasjon extends Ny {
  constructor(props, context) {
    super(props, context);
    this.visBek = this.visBek.bind(this);
    this.skjulBek = this.skjulBek.bind(this);

    this.state = {
      bek: false
    };
  }
  skjulBek() {
    this.setState({ bek: false });
  }

  visBek() {
    this.setState({ bek: true });
  }
  render() {
    return (
      <React.Fragment>
        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Form.Label> Sted: </Form.Label>
            <Form.Control
              id="lokasjon"
              onChange={this.sjekk}
              type="text"
              onInput={e => (this.lokasjon = e.target.value)}
            />
            <br />
            <Button id="knapp" onClick={this.nyLokasjon}>
              Legg til
            </Button>
          </ListGroup.Item>
        </Form.Group>

        <Modal size="sm" show={this.state.bek} onHide={this.skjulBek}>
          <Modal.Header closeButton>
            <Modal.Title>Ny lokasjon!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lokasjon: {this.lokasjon} <br />
            <br />
            Er lagt til i systemet!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulBek}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Form.Label> Legg til ny lokasjon: </Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => (this.lokasjon = e.target.value)}
              placeholder="Stedsnavn"
            />
            <br />
            <Button onClick={this.nyLokasjon}>Legg til</Button>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    );
  }
  mounted() {
    document.getElementById('knapp').disabled = true;
  }
  sjekk() {
    if (this.lokasjon == '') {
      document.getElementById('knapp').disabled = true;
    } else {
      document.getElementById('knapp').disabled = false;
    }
  }
  nyLokasjon() {
    s_lokasjon.NyLokasjoner(this.lokasjon);
    this.visBek();
    document.getElementById('lokasjon').value = '';
  }
}
