import * as React from 'react';
//Henter inn de forskjellige klassenne som inneholder metoder som henter informasjons fra databasen
import { s_typer, s_steder } from './../../services';
import { s_ny, s_info, s_sok, s_ledige, s_restriksjon } from './_bn_services';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { Row, Col, Button, Form, FormControl, ListGroup, Table, InputGroup, Modal } from 'react-bootstrap';
//Henter navigasjonsbaren fra nav
import { Bestilling } from './nav';

// Klassen for å legge inn nye bestillinger
export class BestillingNy extends Bestilling {
  // Popupbokser med forskjellig informasjon
  constructor(props, context) {
    super(props, context);

    this.visBesPop = this.visBesPop.bind(this);
    this.skjulBesPop = this.skjulBesPop.bind(this);
    this.visKundePop = this.visKundePop.bind(this);
    this.skjulKundePop = this.skjulKundePop.bind(this);
    this.visFullPop = this.visFullPop.bind(this);
    this.skjulFullPop = this.skjulFullPop.bind(this);
    this.visFeilPop = this.visFeilPop.bind(this);
    this.skjulFeilPop = this.skjulFeilPop.bind(this);
    this.visResPop = this.visResPop.bind(this);
    this.skjulResPop = this.skjulResPop.bind(this);

    this.valgt = {
      idListe: []
    };
    this.summer = {
      prisListe: []
    };
    this.varerx = {
      vareListe: []
    };

    this.state = {
      tabellSykler: true,
      tabellUtstyr: false,
      bestillingPop: false,
      kundePop: false,
      fullførtPop: false,
      feilPop: false,
      resPop: false
    };
  }

  // Skjul og vis popup for bestilling
  skjulBesPop() {
    this.setState({ bestillingPop: false });
  }
  visBesPop() {
    this.setState({ bestillingPop: true });
  }

  // Skjul og vis popup for feilmelding
  skjulFeilPop() {
    this.setState({ feilPop: false });
  }
  visFeilPop() {
    this.setState({ feilPop: true });
  }

  // Skjul og vis popup for ny kunde
  skjulKundePop() {
    this.setState({ kundePop: false });
  }
  visKundePop() {
    this.setState({ kundePop: true });
  }

  // Skjul og vis popup for fullført bestilling
  skjulFullPop() {
    this.setState({ fullførtPop: false });
  }
  visFullPop() {
    this.setState({ fullførtPop: true });
  }

  // Skjul og vis popup for restriksjoner
  skjulResPop() {
    this.setState({ resPop: false });
  }
  visResPop() {
    this.setState({ resPop: true });
  }

  // Vis tabell for sykler og skjul for utstyr
  tabellSykler() {
    this.setState({
      tabellSykler: true,
      tabellUtstyr: false
    });
  }

  // Vis tabell for utstyr og skjul for sykler
  tabellUtstyr() {
    this.setState({
      tabellSykler: false,
      tabellUtstyr: true
    });
  }

  til = '';
  fra = '';
  til2 = '';
  fra2 = '';
  idListe = [];
  steder = [];
  typerSykler = [];
  typerUtstyr = [];
  kunde = [];
  sykler = [];
  utstyr = [];
  kundeListe = [];
  v_id = [];
  prisListe = [];
  vareListe = [];
  varer = [];
  typerSykler = [];
  minusUtstyr = [];
  type = [];

  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col xs={3}>
              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    {/*Mobilnummer til kunde*/}
                    <Form.Label> Mobilnummer: </Form.Label>
                    <Form.Control
                      id="mobilnummer"
                      placeholder="Søk mobilnummer"
                      type="number"
                      onInput={e => (this.mobilnummer = e.target.value)}
                      onChange={this.sokKunde}
                    />
                    {/*Navn til kunde*/}
                    <Form.Label> Navn: </Form.Label>
                    <Form.Control
                      placeholder="Fornavn Etternavn"
                      id="navn"
                      value={this.navn}
                      onInput={e => (this.navn = e.target.value)}
                      onChange={this.tomKunde}
                    />
                    {/*Email til kunde*/}
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                      placeholder="eksempel@email.com"
                      id="email"
                      value={this.email}
                      onInput={e => (this.email = e.target.value)}
                      onChange={this.tomKunde}
                    />
                  </Col>
                </Row>
                <br />
                {/*Knapp for å legge til en ny kunde*/}
                <Button id="nyKunde" onClick={this.nyKunde}>
                  Ny kunde
                </Button>
              </ListGroup.Item>

              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    {/*Fra dato*/}
                    <Form.Label> Fra: </Form.Label>
                    <Form.Control
                      id="fra"
                      required
                      type="datetime-local"
                      onChange={e => (this.fra = e.target.value) && this.beregnDager()}
                    />
                  </Col>
                  <Col>
                    {/*Til dato*/}
                    <Form.Label> Til: </Form.Label>
                    <Form.Control
                      id="til"
                      required
                      type="datetime-local"
                      onChange={e => (this.til = e.target.value) && this.beregnDager()}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    {/*Hentested*/}
                    <Form.Label>Hentested:</Form.Label>
                    <Form.Control id="henting" as="select" onChange={e => (this.henting = e.target.value)}>
                      {this.steder.map(sted => (
                        <option key={sted.l_id}>{sted.lokasjon}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    {/*Leveringsted*/}
                    <Form.Label>Leveringsted:</Form.Label>
                    <Form.Control id="levering" as="select" onChange={e => (this.levering = e.target.value)}>
                      {this.steder.map(sted => (
                        <option key={sted.l_id}>{sted.lokasjon}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
            <Col xs={6}>
              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    {/*Dropdown med de forskjellige sykkeltypene*/}
                    <Form.Control
                      id="s_type"
                      as="select"
                      onClick={e => (this.type = e.target.value) && this.sokLedigeSykler(e)}
                    >
                      <option hidden>Velg sykkeltype</option>
                      {this.typerSykler.map(typeSykkel => (
                        <option key={typeSykkel.type} value={typeSykkel.type}>
                          {typeSykkel.type}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    {/*Dropdown med de forskjellige utstyrstypene*/}
                    <Form.Control as="select" onClick={e => (this.type = e.target.value) && this.sokLedigeUtstyr(e)}>
                      <option hidden>Velg utstyrstype</option>
                      {this.typerUtstyr.map(typerUtstyr => (
                        <option key={typerUtstyr.type} value={typerUtstyr.type}>
                          {typerUtstyr.type}
                        </option>
                      ))}
                    </Form.Control>
                    <br />
                  </Col>
                  <Col>
                    <div className="align-center">
                      {/*Knapp for å vise de hvilke sykler som passer med hvilke utstyrstyper*/}
                      <Button onClick={this.visResPop} id="restriksjoner">
                        Restriksjoner
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/*Tabell for sykler*/}
              {this.state.tabellSykler ? (
                <div className="table">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th className="text-center">ID</th>
                        <th>Type</th>
                        <th>Ramme</th>
                        <th className="text-center">Gir</th>
                        <th className="text-center">Hjul</th>
                        <th className="text-center">Pris</th>
                        <th className="text-center">Velg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*Går gjennom alle syklene som blir hentet fra databsen og legger de inn i tabellen*/}
                      {this.sykler.map(sykkel => (
                        <tr key={sykkel.v_id}>
                          <td className="text-center">{sykkel.v_id}</td>
                          <td>{sykkel.type}</td>
                          <td>{sykkel.ramme}</td>
                          <td className="text-center">{sykkel.girsystem}</td>
                          <td className="text-center">{sykkel.størrelse_hjul}</td>
                          <td className="text-center">{sykkel.pris}</td>
                          {/*Knapp for å velge hvilke sykler man øsnker*/}
                          <Form.Check
                            tagName="box"
                            id={sykkel.v_id}
                            value={sykkel.pris}
                            onClick={e => (this.v_id = parseInt(e.target.id)) && (this.pris = parseInt(e.target.value))}
                            className="text-center"
                            onChange={e => {
                              this.leggTilVare(e);
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}
              {/*Tabell for utstyr*/}
              {this.state.tabellUtstyr ? (
                <div className="table">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th className="text-center">ID</th>
                        <th>Type</th>
                        <th className="text-center">Pris</th>
                        <th className="text-center">Velg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*Går gjennom alt utstyret som blir hentet fra databsen og legger de inn i tabellen*/}
                      {this.utstyr.map(utstyr => (
                        <tr key={utstyr.v_id}>
                          <td className="text-center">{utstyr.v_id}</td>
                          <td>{utstyr.type}</td>
                          <td className="text-center">{utstyr.pris}</td>
                          {/*Knapp for å velge hvilke utstyr man øsnker*/}
                          <Form.Check
                            id={utstyr.v_id}
                            value={utstyr.pris}
                            onClick={e => (this.v_id = e.target.id) && (this.pris = parseInt(e.target.value))}
                            className="text-center"
                            onChange={e => {
                              this.leggTilVare(e);
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}
            </Col>
            <Col xs={3}>
              <ListGroup.Item className="list-group-item">
                <Row>
                  <Col>
                    <div className="statevarer">
                      {/*Tabell som viser informasjon om de valgte varene*/}
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th className="text-center">Pris</th>
                            <th className="text-center">Fjern</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/*Går gjennom de valgte varene og henter ut informasjon om de*/}
                          {this.vareListe.map(vare => (
                            <tr key={vare.v_id}>
                              <td>{vare.type}</td>
                              <td className="text-center">{vare.pris}</td>
                              <div className="text-center">
                                {/*Knapp for å fjerne varer fra bestillingen*/}
                                <Button
                                  value={vare.v_id}
                                  id={vare.pris}
                                  onClick={e =>
                                    (this.v_id = e.target.value) &&
                                    (this.pris = parseInt(e.target.id)) &&
                                    this.fjernVare(e)
                                  }
                                >
                                  Fjern
                                </Button>
                              </div>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {/*Informasjon om antall varer, rabatt og pris på bestillingen*/}
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <div>Antall varer:</div>
                        </Col>
                        <Col>
                          <div> {this.prisListe.length} </div>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>Rabatt:</div>
                        </Col>
                        <Col>
                          <div>{this.rabatt}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>Pris:</div>
                        </Col>
                        <Col>
                          <div> {this.totalSum} </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          {/*Knapp for å legge inn en ny bestilling*/}
                          <Button id="nyBestilling" onClick={this.sjekkBestilling}>
                            Ny bestilling
                          </Button>
                        </Col>
                        <Col>
                          {/*Knapp for å resete bestillingen*/}
                          <Button variant="danger" onClick={this.reset}>
                            Nullstill
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
          </Row>

          {/*Popup for å vise informasjon og innholdet i bestillingen*/}
          <Modal centered size="lg" show={this.state.bestillingPop} onHide={this.skjulBesPop}>
            <Modal.Header closeButton>
              <Modal.Title>Bestilling</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <div className="align-center">
                    Navn: {this.navn} <br />
                    Email: {this.email} <br />
                    Mobilnummer: {this.mobilnummer} <br />
                    <br />
                    Fra: {this.fra2} <br />
                    Til: {this.til2} <br />
                    Hentested: {this.henting} <br />
                    Leveringssted: {this.levering} <br />
                    <br />
                    Rabatt: {this.rabatt} kroner <br />
                    Total sum: {this.totalSum} kroner
                  </div>
                </Col>
                <Col>
                  <div className="bekreftelse">
                    <Table striped bordered hover size="sm" xs={2}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th className="text-center">Pris</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.vareListe.map(vare => (
                          <tr key={vare.v_id}>
                            <td>{vare.type}</td>
                            <td className="text-center">{vare.pris}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulBesPop}>
                Gå tilbake
              </Button>
              {/*Knapp for å legge inn en ny bestilling*/}
              <Button variant="primary" onClick={this.nyBestilling}>
                Fullfør Bestillingen
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup som kommer opp når man legger til en ny kunde*/}
          <Modal size="sm" centered show={this.state.kundePop} onHide={this.skjulKundePop}>
            <Modal.Header closeButton>
              <Modal.Title>Kunde</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Navn: {this.navn} <br />
              Email: {this.email} <br />
              Mobilnummer: {this.mobilnummer} <br />
              <br />
              Er lagt til i systemet!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulKundePop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup som kommer opp når man fullfører en bestilling*/}
          <Modal size="sm" show={this.state.fullførtPop} onHide={this.skjulFullPop}>
            <Modal.Header closeButton>
              <Modal.Title>Bestilling</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bestillingen er lagt til i systemet!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulFullPop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup som kommer opp om man trykker på ny bestilling, men bestillingen har feil eller mangler*/}
          <Modal centered size="md" show={this.state.feilPop} onHide={this.skjulFeilPop}>
            <Modal.Header closeButton>
              <Modal.Title>Feil!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Denne bestillingen har feil eller mangler! <br />
              <br />
              Dette kan være:
              <ul>
                <li> Manglende informasjon om kunden </li>
                <li> Manglende dato </li>
                <li> Sluttdato er før startdato </li>
                <li> Bestillingen har ikke noe innhold </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulFeilPop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Popup som viser de forskjellige sykkeltypene og hvilke utstyrstyper som passer*/}
          <Modal centered size="sm" show={this.state.resPop} onHide={this.skjulResPop}>
            <Modal.Header closeButton>
              <Modal.Title>Restriksjoner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.passendeUtstyr(e)}>
                    {this.typerSykler.map(typeSykkel => (
                      <option value={typeSykkel.type}>{typeSykkel.type}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <div className="restr">
                    <Table striped bordered hover size="sm" xs={4}>
                      <thead>
                        <tr>
                          <th>Passer til</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.minusUtstyr.map(utstyr => (
                          <tr key={utstyr.type}>
                            <td>{utstyr.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.skjulResPop}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      </React.Fragment>
    );
  }

  // Metode som kjører når man henter inn siden
  mounted() {
    // Henter inn de forskjellige lokasjonene fra databasen
    s_steder.Steder(steder => {
      this.steder = steder;
      // Setter henting og levering til å være den første lokasjonen
      this.henting = this.steder[0].lokasjon;
      this.levering = this.steder[0].lokasjon;
    });
    // Henter ut de forskjellige sykkeltypene
    s_typer.SyklerTyper(typerSykler => {
      this.typerSykler = typerSykler;
    });
    // Henter ut de forskjellige utstyrstypene
    s_typer.UtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
    });
    // Setter ny kunde-knappen til disabled
    document.getElementById('nyKunde').disabled = true;

    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.idListe = idListe;
    this.vareListe = vareListe;
    this.prisListe = prisListe;
  }

  // Metode som sjekker bestillingen for mangler
  sjekkBestilling() {
    let mobilnummer = document.getElementById('mobilnummer').value;
    let navn = document.getElementById('navn').value;
    let email = document.getElementById('email').value;
    let fra = document.getElementById('fra').value;
    let til = document.getElementById('til').value;

    const { idListe } = this.state;

    this.navn = document.getElementById('navn').value;
    this.email = document.getElementById('email').value;

    // Fjerner "T" fra fra og til-datoene
    this.fra2 = this.fra.replace('T', ' ');
    this.til2 = this.til.replace('T', ' ');

    // Hvis bestillingen inneholder 0 varer eller mobilnummer, navn, email, fra, til ikke er utfylt eller fra-datoen er før til-datoen vis popup med hva som kan vær feilen ellers vis informasjon om bestillingen
    if (
      this.idListe.length === 0 ||
      mobilnummer == '' ||
      navn == '' ||
      email == '' ||
      fra == '' ||
      til == '' ||
      this.fra >= this.til
    ) {
      this.visFeilPop();
    } else {
      this.visBesPop();
    }
  }

  // Metode som skjekker om det er skrevet noe inn i mobilnummer, navn og email
  tomKunde() {
    let mobilnummer = document.getElementById('mobilnummer').value;
    let navn = document.getElementById('navn').value;
    let email = document.getElementById('email').value;

    // Hvis noen av de mangler er ny kunde-knappen disabled og hvis ikke er den enabled
    if (mobilnummer == '' || navn == '' || email == '') {
      document.getElementById('nyKunde').disabled = true;
    } else {
      document.getElementById('nyKunde').disabled = false;
    }
  }

  // Metode som fjerner en vare fra bestillingen
  fjernVare(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    // Loop som går gjennom å sjekker om den v_id'en man sletter viser i utstyrstabellen. Hvis den viser så gjør den at knappen kan klikkes på igjen
    for (var j = 0; j < this.utstyr.length; j++) {
      if (this.utstyr[j].v_id == this.v_id) {
        document.getElementById(this.v_id).disabled = false;
        document.getElementById(this.v_id).checked = false;
      }
    }
    // Loop som går gjennom å sjekker om den v_id'en man sletter viser i sykeltabellen. Hvis den viser så gjør den at knappen kan klikkes på igjen
    for (var k = 0; k < this.sykler.length; k++) {
      if (this.sykler[k].v_id == this.v_id) {
        document.getElementById(this.v_id).disabled = false;
        document.getElementById(this.v_id).checked = false;
      }
    }
    // Loop som går gjennom de forskjellige listene og fjerner v_id'en man fjerner
    for (var i = 0; i < this.idListe.length; i++) {
      if (this.idListe[i] == this.v_id) {
        this.idListe.splice(i, 1);
        this.vareListe.splice(i, 1);
        this.prisListe.splice(i, 1);
      }
    }
    // Beregner dager på ny
    this.beregnDager();
    // Beregner pris og rabatt på ny
    this.BeregnPrisOgRabatt();
  }

  // Beregner pris og rabatt på en bestilling
  BeregnPrisOgRabatt() {
    const { prisListe } = this.summer;
    var totalSum = 0;
    var rabatt = 0;

    // Går gjennom prislisten og legger sammen de forskjellige prisene
    for (var i = 0; i < prisListe.length; i++) {
      totalSum += prisListe[i];
    }
    // Ganger totalsummen med dager
    totalSum = totalSum * this.dager;

    // Hvis det er 10 eller flere varer i en bestilling eller kunden har 10 eller flere bestillinger i systemet så får de 10% rabatt
    if (this.prisListe.length >= 10 || this.antall[0].antall >= 10) {
      rabatt = totalSum * 0.1;
      // Summen av rabatten blir fjernet fra totalsummen
      totalSum = totalSum - rabatt;
    }

    this.rabatt = rabatt;
    this.totalSum = totalSum;
    this.prisListe = prisListe;
  }

  // Metode som legger til en ny vare i bestillingen
  leggTilVare(e) {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;
    // Legger til v_id'en i de forskjellige listene
    idListe.push(this.v_id);
    prisListe.push(this.pris);

    // Søker opp v_id'en i databasen og henter ut all informasjonen og legger den inn i vareListe
    s_info.Varer(
      this.v_id,
      varer => {
        this.varer = varer;
        setTimeout(() => {
          for (var i = 0; i < idListe.length; i++) {
            vareListe.push({ v_id: this.v_id, type: this.varer[i].type, pris: this.varer[i].pris });
          }
        });
      },
      250
    );
    // Setter checkboxen til disabled
    document.getElementById(this.v_id).disabled = true;

    // Beregner dager
    this.beregnDager();
    // Beregner pris og rabatt
    this.BeregnPrisOgRabatt();
  }

  // Metode for å legge inn en ny kunde
  nyKunde() {
    s_ny.Kunde(this.navn, this.email, this.mobilnummer);
    this.visKundePop();
    document.getElementById('nyKunde').disabled = true;
    document.getElementById('navn').placeholder = this.navn;
    document.getElementById('email').placeholder = this.email;
    s_info.AntallBestillinger(this.mobilnummer, antall => {
      this.antall = antall;
    });
  }

  // Metode for å sjekke om kunden allerede er registret
  sokKunde() {
    // Bruker mobilnummer til å søke opp navn og epost til eksisterende kunder
    s_sok.Kunde(this.mobilnummer, kundeSok => {
      this.kundeListe = kundeSok;
    });
    // Henter ut hvor mange bestillinger kunden har i databasen
    s_info.AntallBestillinger(this.mobilnummer, antall => {
      this.antall = antall;
    });
    setTimeout(() => {
      if (this.kundeListe.length == 0) {
        document.getElementById('navn').placeholder = 'Fornavn Etternavn';
        document.getElementById('email').placeholder = 'eksempel@email.com';

        document.getElementById('navn').value = '';
        document.getElementById('email').value = '';

        document.getElementById('navn').disabled = false;
        document.getElementById('email').disabled = false;
        console.log(this.kundeListe.length);
      } else if (this.kundeListe.length == 1) {
        document.getElementById('navn').placeholder = this.kundeListe[0].navn;
        document.getElementById('email').placeholder = this.kundeListe[0].email;

        document.getElementById('navn').value = document.getElementById('navn').placeholder;
        document.getElementById('email').value = document.getElementById('email').placeholder;

        document.getElementById('navn').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('nyKunde').disabled = true;
        console.log(this.kundeListe.length);
      }
    }, 250);
  }

  // Metode for å legge inn en ny bestilling
  nyBestilling() {
    // Bruker informasjonen til å legge inn en ny bestilling i databasen
    s_ny.Bestilling(this.fra, this.til, this.henting, this.levering, this.mobilnummer, this.rabatt, this.totalSum);

    // Loop som legger inn bestillings id'en og de forskjellige varene inn i utleielisten
    for (var i = 0; i < this.idListe.length; i++) {
      s_ny.Varer(this.idListe[i]);
    }
    // Skjuler bestillings popupen og viser fullført popupen. Rester også bestillingssiden
    this.skjulBesPop();
    this.visFullPop();
    this.reset();
  }

  // Metode som henter ut de ledige syklene
  sokLedigeSykler() {
    // Bruker type, fra og til-dato til å hente ut ledige sykler av den typen i det tidsrommet
    s_ledige.Sykler(this.fra, this.til, this.type, sykler => {
      this.sykler = sykler;
      this.sjekkCheckboxSykler();
    });
    // Viser tabell for sykler
    this.tabellSykler();
  }

  // Metode som henter ut det ledige utstyret
  sokLedigeUtstyr() {
    // Bruker type, fra og til-dato til å hente ut ledige utstyr av den typen i det tidsrommet
    s_ledige.Utstyr(this.fra, this.til, this.type, utstyr => {
      this.utstyr = utstyr;
      this.sjekkCheckboxUtstyr();
    });
    // Viser tabell for utstyr
    this.tabellUtstyr();
  }

  // Metode for å sjekke hvilke bokser som skal være checked
  sjekkCheckboxSykler() {
    for (var i = 0; i < this.sykler.length; i++) {
      for (var y = 0; y < this.idListe.length; y++) {
        if (this.sykler[i].v_id == this.idListe[y]) {
          document.getElementById(this.idListe[y]).disabled = true;
          document.getElementById(this.idListe[y]).checked = true;
        }
      }
    }
  }

  // Metode for å sjekke hvilke bokser som skal være checked
  sjekkCheckboxUtstyr() {
    for (var i = 0; i < this.utstyr.length; i++) {
      for (var y = 0; y < this.idListe.length; y++) {
        if (this.utstyr[i].v_id == this.idListe[y]) {
          document.getElementById(this.idListe[y]).disabled = true;
          document.getElementById(this.idListe[y]).checked = true;
        }
      }
    }
  }

  // Metode for å beregne hvor mange dager en bestilling er på
  beregnDager() {
    var til = new Date(this.til);
    var fra = new Date(this.fra);

    var res = Math.abs(fra - til) / 1000;
    var dager = Math.floor(res / 86400);
    this.dager = dager;

    // Hvis bestillinger er på under 0 dag blir det en dag
    if (this.dager == 0) {
      this.dager = 1;
      // Hvis bestillingen er på 7 dager eller flere blir det 7 dager
    } else if (this.dager >= 7) {
      this.dager = 7;
    }
    // Beregner pris og rabatt
    this.BeregnPrisOgRabatt();
  }

  // Metode som heter passende utstyr
  passendeUtstyr() {
    // Bruker typen til å hente ut utstyrstypene som passer med sykkeltypen
    s_restriksjon.HentPassendeUtstyr(this.type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
  }

  // Metode som reseter bestillingen tilbake til null
  reset() {
    const { idListe } = this.valgt;
    const { vareListe } = this.varerx;
    const { prisListe } = this.summer;

    this.fjernVare = this.prisListe.length;

    // Fjerner alle varene for alle listene
    for (var m = 0; m < this.fjernVare; m++) {
      this.idListe.pop(m);
      this.vareListe.pop(m);
      this.prisListe.pop(m);
    }

    // Viser tabell for sykler
    this.setState({
      tabellSykler: false,
      tabellUtstyr: false
    });

    this.totalSum = 0;
    this.rabatt = 0;
    this.mobilnummer = '';
    this.kundeListe = [];

    this.henting = this.steder[0].lokasjon;
    this.levering = this.steder[0].lokasjon;

    document.getElementById('mobilnummer').value = '';
    document.getElementById('navn').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('nyKunde').disabled = true;

    document.getElementById('fra').value = '';
    document.getElementById('til').value = '';

    this.sokKunde();
    this.BeregnPrisOgRabatt();
  }
}
