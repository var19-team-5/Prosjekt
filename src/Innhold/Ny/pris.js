import * as React from 'react';
//Henter inn de forskjellige klassenne som inneholder metoder som henter informasjons fra databasen
import { s_typer } from './../../services';
import { s_pris } from './_n_services';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { ListGroup, Form, Row, Col, Button, InputGroup, FormControl, Modal, Table } from 'react-bootstrap';
//Henter navigasjonsbaren fra nav
import { Ny } from './nav';

//Eksporterer klassen for ny pris
export class Pris extends Ny {
  constructor(props, context) {
    super(props, context);
    this.visEndringPop = this.visEndringPop.bind(this);
    this.skjulEndringPop = this.skjulEndringPop.bind(this);

    this.state = {
      endringPop: false
    };
  }

  // Viser og skjuler bekreftelses-popup
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
        <ListGroup.Item className="list-group-item">
          <h5> Endre pris på type: </h5>
          <br />
          <Row>
            <Col>
              <ListGroup.Item className="list-group-item">
                <h5> Sykkel </h5>
                <br />
                <Form.Label>Velg type:</Form.Label>
                {/*De forskjellige sykkeltypene*/}
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
                </Form.Control>
                <br />
                <Form.Label>Pris:</Form.Label>
                {/*Viser gammel pris som placeholder og kan skrive inn ny pris*/}
                <Form.Control id="sykkelPris" type="number" onChange={e => (this.pris = e.target.value)} />
                <br />
                <Button onClick={this.nyPrisSykkel}>Endre pris</Button>
              </ListGroup.Item>
            </Col>
            <Col>
              <ListGroup.Item className="list-group-item">
                <h5> Utstyr </h5>
                <br />
                <Form.Label>Velg type:</Form.Label>
                {/*De forskjellige utstyrstypene*/}
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
                <br />
                <Form.Label>Pris:</Form.Label>
                {/*Viser gammel pris som placeholder og kan skrive inn ny pris*/}
                <Form.Control id="utstyrPris" type="number" onChange={e => (this.pris = e.target.value)} />
                <br />
                <Button onClick={this.nyPrisUtstyr}>Endre pris</Button>
              </ListGroup.Item>
            </Col>
          </Row>

          {/*Popup for å bekrefte endringen*/}
          <Modal size="sm" show={this.state.endringPop} onHide={this.skjulEndringPop}>
            <Modal.Header closeButton>
              <Modal.Title>Pris er oppdatert</Modal.Title>
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
        </ListGroup.Item>
      </React.Fragment>
    ];
  }

  // Metode som kjører når man henter inn siden
  mounted() {
    // Henter de forskjellige sykkeltypene
    s_typer.AlleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = this.typerSykler[0].type;
      document.getElementById('sykkelPris').placeholder = this.typerSykler[0].pris + ',-';
    });
    // Henter de forskjellige utstyrstypene
    s_typer.AlleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = this.typerUtstyr[0].type;
      document.getElementById('utstyrPris').placeholder = this.typerUtstyr[0].pris + ',-';
    });
  }

  // Metode som endrer pris på en sykkeltype
  nyPrisSykkel() {
    s_pris.EndrePris(this.pris, this.type);
    document.getElementById('sykkelPris').value = '';
    this.PriserSykkel();
    this.visEndringPop();
  }

  // Metode som endrer pris på en utstyrstype
  nyPrisUtstyr() {
    s_pris.EndrePris(this.pris, this.type);
    document.getElementById('utstyrPris').value = '';
    this.PriserUtstyr();
    this.visEndringPop();
  }

  // Metode som heler pris på valgt sykkeltype
  PriserSykkel() {
    s_pris.Priser(this.type, priser => {
      this.priser = priser;
      document.getElementById('sykkelPris').placeholder = this.priser[0].pris + ',-';
    });
  }

  // Metode som henter pris på valgt utstyrstype
  PriserUtstyr() {
    s_pris.Priser(this.type, priser => {
      this.priser = priser;
      document.getElementById('utstyrPris').placeholder = this.priser[0].pris + ',-';
    });
  }
}
