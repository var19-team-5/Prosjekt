import * as React from 'react';
//Henter inn de forskjellige klassenne som inneholder metoder som henter informasjons fra databasen
import { s_lokasjon } from './_n_services';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { Form, ListGroup, Button, Modal, Row, Col } from 'react-bootstrap';
//Henter klassen Ny fra navbaren
import { Ny } from './nav';

//Eksporterer klassen for ny lokasjon
export class Lokasjon extends Ny {
  constructor(props, context) {
    super(props, context);
    this.visBek = this.visBek.bind(this);
    this.skjulBek = this.skjulBek.bind(this);

    this.state = {
      bek: false
    };
  }

  // Viser og skjuler bekreftelses-popup
  skjulBek() {
    this.setState({ bek: false });
  }
  visBek() {
    this.setState({ bek: true });
  }

  //Starter en render funksjon
  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h5> Legg til ny lokasjon: </h5>
          <br />
          <Row>
            <Col xs={3}>
              <Form.Label> Lokasjon: </Form.Label>
              {/*Hvor man kan skrive inn den nye lokasjonen*/}
              <Form.Control
                id="lokasjon"
                onChange={this.sjekk}
                type="text"
                onInput={e => (this.lokasjon = e.target.value)}
                placeholder="Stedsnavn"
              />
              <br />
              {/*Knapp for å legge til ny bestilling*/}
              <Button id="knapp" onClick={this.nyLokasjon}>
                Legg til
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>

        {/*Popup som bekrefter at man har lagt til en ny lokasjon*/}
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

  // Metode som kjører når man henter inn siden
  mounted() {
    // Setter knappen til disablet siden det ikke står noe i boksen
    document.getElementById('knapp').disabled = true;
  }

  // Metode som sjekker om det er skrevet noe inn i boksen
  sjekk() {
    // Hvis boksen er tom er knappen disabled hvis ikke er den enabled
    if (this.lokasjon == '') {
      document.getElementById('knapp').disabled = true;
    } else {
      document.getElementById('knapp').disabled = false;
    }
  }

  // Metode som legger til en ny lokasjon
  nyLokasjon() {
    // Bruker lokasjonen til å legge til en ny
    s_lokasjon.NyLokasjoner(this.lokasjon);
    // Viser bekreftelses-popup
    this.visBek();
    // Setter boksen til tom
    document.getElementById('lokasjon').value = '';
  }
}
