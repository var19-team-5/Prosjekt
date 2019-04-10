import * as React from 'react';
//Henter inn de forskjellige klassenne som inneholder metoder som henter informasjons fra databasen
import { s_steder, s_typer } from './../../services';
import { s_vare, s_sykkel } from './_n_services';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { ListGroup, Form, Row, Col, Button, Modal } from 'react-bootstrap';
//Henter navigasjonsbaren fra nav
import { Ny } from './nav';

//Eksporterer klassen for ny sykkel
export class Sykkel extends Ny {
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

  // Viser og skjuler ny type-popup
  skjulNyType() {
    this.setState({ nytypepop: false });
  }
  visNyType() {
    this.setState({ nytypepop: true });
  }

  // Viser og skjuler bekreftelse på ny type-popup
  skjulBekNY() {
    this.setState({ bekpopNY: false });
  }
  visBekNY() {
    this.setState({ bekpopNY: true });
  }

  // Viser og skjuler bekreftelses på ny sykkel/sykler-popup
  skjulBek() {
    this.setState({ bekpop: false });
  }
  visBek() {
    this.setState({ bekpop: true });
  }

  // Viser og skjuler sammendrags-popup
  skjulSam() {
    this.setState({ sampop: false });
  }
  visSam() {
    this.setState({ sampop: true });
  }

  steder = [];
  typerSykler = [];
  nytype = '';
  nypris = '';
  ramme = '';
  girsystem = '';
  størrelse_hjul = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h5>Legg til ny sykkel: </h5>
          <br />
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col xs={3}>
                <Form.Label>Velg type:</Form.Label>
                {/*De forskjellige sykkeltypene*/}
                <Form.Control id="type" as="select" onChange={e => (this.type = e.target.value)}>
                  {this.typerSykler.map(typeSykkel => (
                    <option key={typeSykkel.type} value={typeSykkel.type}>
                      {typeSykkel.type}
                    </option>
                  ))}
                </Form.Control>
                <br />
                {/*Knapp for å legge inn en ny type*/}
                <Button onClick={this.visNyType}>Ny type</Button>
              </Col>
              <Col xs={1}>
                <Form.Label>Antall:</Form.Label>
                {/*Skrive inn hvor mange man like man ønsker å legge inn*/}
                <Form.Control
                  id="antall"
                  type="number"
                  onChange={e => (this.antall = e.target.value)}
                  placeholder="00"
                />
              </Col>
            </Row>
          </ListGroup.Item>

          <Form.Group>
            <ListGroup.Item className="list-group-item">
              <Row>
                <Col xs={3}>
                  <Form.Label>Tilhører:</Form.Label>
                  {/*Velger hvor syklen/syklene hører til*/}
                  <Form.Control as="select" onChange={e => (this.tilhører = e.target.value)}>
                    {this.steder.map(sted => (
                      <option key={sted.lokasjon} value={sted.tilhører}>
                        {sted.lokasjon}
                      </option>
                    ))}
                    <br />
                  </Form.Control>
                </Col>
                {/*Skriver inn ramme*/}
                <Col xs={3}>
                  <Form.Label>Ramme:</Form.Label>
                  <Form.Control
                    id="ramme"
                    onInput={e => (this.ramme = e.target.value)}
                    onChange={this.sjekk}
                    placeholder="Navn"
                  />
                </Col>
                {/*Skriver inn gir*/}
                <Col xs={1}>
                  <Form.Label> Gir: </Form.Label>
                  <Form.Control
                    id="girsystem"
                    type="number"
                    onInput={e => (this.girsystem = e.target.value)}
                    onChange={this.sjekk}
                    placeholder="00"
                  />
                </Col>
                {/*Skriver inn størrelse på hjul*/}
                <Col xs={1}>
                  <Form.Label>Hjul:</Form.Label>
                  <Form.Control
                    id="størrelse_hjul"
                    type="number"
                    onInput={e => (this.størrelse_hjul = e.target.value)}
                    onChange={this.sjekk}
                    placeholder="00"
                  />
                </Col>
              </Row>
              <br />
              {/*Viser bedreftelses-popup*/}
              <Button id="nySykkelKnapp" onClick={this.visSam}>
                Legg til
              </Button>
            </ListGroup.Item>
          </Form.Group>

          {/*Popup for å legge inn en ny type*/}
          <Modal size="lg" centered show={this.state.nytypepop} onHide={this.skjulNyType}>
            <Modal.Header closeButton>
              <Modal.Title>Legg til ny type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Label>Ny type:</Form.Label>
                  <Form.Control onChange={this.sjekkNy} onInput={e => (this.nytype = e.target.value)} />
                </Col>
                <Col>
                  <Form.Label>Pris:</Form.Label>
                  <Form.Control type="number" onChange={this.sjekkNy} onInput={e => (this.nypris = e.target.value)} />
                  <br />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulNyType}>
                Gå tilbake
              </Button>
              <Button id="nyType" onClick={this.nyTypeSykkel}>
                Legg til
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup for å bekrefte en ny type*/}
          <Modal size="sm" centered show={this.state.bekpopNY} onHide={this.skjulBekNY}>
            <Modal.Header closeButton>
              <Modal.Title>Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Ny type er lagt til! <br />
              <br /> Husk å legg til restriksjoner nå eller senere!
            </Modal.Body>
            <Modal.Footer>
              <Button href="#/ny/restriksjon">Restriksjoner</Button>

              <Button variant="secondary" onClick={this.skjulBekNY}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup for å vise sammendrag av hva en ønsker å legge til*/}
          <Modal size="sm" centered show={this.state.sampop} onHide={this.skjulSam}>
            <Modal.Header closeButton>
              <Modal.Title>Ny type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Type: {this.type} <br />
              Tilhører: {this.tilhører}
              <br />
              <br />
              Ramme: {this.ramme}
              <br />
              Girsystem: {this.girsystem}
              <br />
              Størrelse hjul: {this.størrelse_hjul}
              <br />
              <br />
              Antall: {this.antall}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulSam}>
                Gå tilbake
              </Button>
              {/*Knapp for å */}
              <Button onClick={this.nySykkel}>Legg til</Button>
            </Modal.Footer>
          </Modal>

          {/*Popup for brekreftelse når man legger inn nye sykler*/}
          <Modal size="sm" centered show={this.state.bekpop} onHide={this.skjulBek}>
            <Modal.Header closeButton>
              <Modal.Title>Nye sykler</Modal.Title>
            </Modal.Header>
            <Modal.Body>Nye sykler er lagt til!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulBek}>
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
    // Henter alle de forskjellige sykkeltypene
    s_typer.AlleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = this.typerSykler[0].type;
    });
    // Henter inn stedene
    s_steder.Steder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
    document.getElementById('nySykkelKnapp').disabled = true;
  }

  // Metode som sjekker om det er noen mangler når man legger til en ny sykkel/sykler
  sjekk() {
    // Hvis det ikke er skrevet noe inn i en boks kan man ikke trykke på legg til-knappen
    if (this.ramme == '' || this.girsystem == '' || this.størrelse_hjul == '' || this.antall == '') {
      document.getElementById('nySykkelKnapp').disabled = true;
    } else {
      document.getElementById('nySykkelKnapp').disabled = false;
    }
  }

  // Metode som skjekker om det er noen mangler når man legger til en ny type syklers
  sjekkNy() {
    // Hvis det ikke er skrevet noe inn i en bok kan man ikke trykke på legg til-knappen
    if (this.nytype == '' || this.nypris == '') {
      document.getElementById('nyType').disabled = true;
    } else {
      document.getElementById('nyType').disabled = false;
    }
  }

  // Metode for å legge inn nye sykler
  nySykkel() {
    // Loop som legger inn alle syklene
    for (var i = 0; i < this.antall; i++) {
      s_vare.NyVare(this.tilhører, this.type);
      s_sykkel.NySykkel(this.type, this.ramme, this.girsystem, this.størrelse_hjul);
      this.skjulSam();
      this.visBek();
    }
  }

  // Metode for å legge inn ny sykkeltype
  nyTypeSykkel() {
    s_sykkel.NyTypeSykkel(this.nytype, this.nypris);
    this.skjulNyType();
    this.visBekNY();
    this.mounted();
  }
}
