import * as React from 'react';
//henter inn alt under s_lokasjon så vi kan bruke det for å hente data fra databasen
import { s_lokasjon } from './_n_services';
//henter komponentene i react bootstrap som vi bruker i denne filen
import { Form, ListGroup, Button, Modal, Row, Col } from 'react-bootstrap';
//henter klassen Ny fra navbaren
import { Ny } from './nav';
//eksporterer Lokasjon klassen som skal vises under Ny
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
  //starter en render funksjon
  render() {
    return (
      //legger inn en ListGroup med innhold
      <React.Fragment>
          <ListGroup.Item className="list-group-item">
          <h5> Legg til ny lokasjon: </h5>
          <br/>
          <Row>
            <Col xs={3}>
            <Form.Label> Lokasjon: </Form.Label>
            <Form.Control
              id="lokasjon"
              onChange={this.sjekk}
              type="text"
              onInput={e => (this.lokasjon = e.target.value)}
              placeholder="Stedsnavn"
            />
            <br />
            <Button id="knapp" onClick={this.nyLokasjon}>
              Legg til
            </Button>
            </Col>
          </Row>
          </ListGroup.Item>
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
