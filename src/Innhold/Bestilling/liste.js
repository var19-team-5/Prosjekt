import * as React from 'react';
//Henter inn de forskjellige klassenne som inneholder metoder som henter informasjons fra databasen
import { s_statuser, s_slett, s_bestilling } from './_bl_services';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import {
  Table,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Modal,
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
// Henter navigasjonsbaren fra nav
import { Bestilling } from './nav';

// Klassen for oversikt over bestillingene i systemet
export class Liste extends Bestilling {
  // Popupbokser med forskjellig informasjon
  constructor(props, context) {
    super(props, context);

    this.visInfoPop = this.visInfoPop.bind(this);
    this.skjulInfoPop = this.skjulInfoPop.bind(this);
    this.visSikkerPop = this.visSikkerPop.bind(this);
    this.skjulSikkerPop = this.skjulSikkerPop.bind(this);
    this.visSlettPop = this.visSlettPop.bind(this);
    this.skjulSlettPop = this.skjulSlettPop.bind(this);

    this.state = {
      infoPop: false,
      sikkerPop: false,
      slettPop: false
    };
  }

  // Skjul og vis popup informasjon om en bestilling
  skjulInfoPop() {
    this.setState({ infoPop: false });
  }
  visInfoPop() {
    this.setState({ infoPop: true });
  }
  // Skjul og vis popup for bekreftelse på å slette en bestilling
  skjulSikkerPop() {
    this.setState({ sikkerPop: false });
  }
  visSikkerPop() {
    this.setState({ sikkerPop: true });
  }
  // Skjul og vis popup når en har slettet en bestilling
  skjulSlettPop() {
    this.setState({ slettPop: false });
  }
  visSlettPop() {
    this.setState({ slettPop: true });
  }

  bestillinger = [];
  valgt = [];
  varer = [];

  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <InputGroup className="mb-3">
            {/*Mulighet til å finne bestillingene til en person*/}
            <FormControl
              placeholder="Søk kundenavn"
              aria-describedby="basic-addon2"
              type="text"
              value={this.navn}
              onInput={e => (this.navn = e.target.value)}
              onChange={this.sok}
            />
          </InputGroup>
        </ListGroup.Item>
        <div id="status" className="tabeller">
          {/*Tabell som viser informasjon om bestillingene*/}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Kunde</th>
                <th>Hentested</th>
                <th>Leveringssted</th>
                <th className="text-center">Rabatt</th>
                <th className="text-center">Pris</th>
                <th>Status</th>
                <th className="text-center">Info</th>
              </tr>
            </thead>
            <tbody>
              {/*Går gjennom bestillingene og legger de i en tabell*/}
              {this.bestillinger.map(bestilling => (
                <tr value={bestilling.b_id}>
                  <td className="text-center">{bestilling.b_id}</td>
                  <td>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(bestilling.fra)}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(bestilling.til)}
                  </td>
                  <td>{bestilling.navn}</td>
                  <td>{bestilling.hentested}</td>
                  <td>{bestilling.leveringssted}</td>
                  <td className="text-center">{bestilling.rabatt}</td>
                  <td className="text-center">{bestilling.pris}</td>
                  <td>{bestilling.status}</td>
                  <div className="text-center">
                    {/*Knapp for å lese mer informasjon om en bestilling og kunne endre status eller fjerne en bestilling*/}
                    <Button value={bestilling.b_id} onClick={e => (this.b_id = e.target.value) && this.hent(e)}>
                      vis
                    </Button>
                  </div>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/*Popup for å vise informasjon om en bestilling*/}
        <Modal centered size="lg" show={this.state.infoPop} onHide={this.skjulInfoPop}>
          <Modal.Header closeButton>
            <Modal.Title>Bestilling {this.b_id}</Modal.Title>
          </Modal.Header>
          {/*Viser informasjonen om bestillingen*/}
          {this.valgt.map(valgt => (
            <Modal.Body>
              <Row>
                <Col>
                  <div>
                    Kunde: {valgt.navn} <br />
                    <br />
                    Fra:{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(valgt.fra)}
                    <br />
                    Til:{' '}
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(valgt.til)}
                    <br />
                    <br />
                    Hentested: {valgt.hentested}
                    <br />
                    Leveringsted: {valgt.leveringssted}
                    <br />
                    <br />
                    Rabatt: {valgt.rabatt}
                    <br />
                    Pris: {valgt.pris}
                    <br />
                    <br />
                    Status: {valgt.status}
                    <br />
                    <ButtonGroup>
                      {/*Dropdown-meny for å kunne endre status på bestillingen og varene*/}
                      <DropdownButton as={ButtonGroup} title="Endre status" id="bg-nested-dropdown">
                        <Dropdown.Item onClick={this.bestilt}>Bestilt</Dropdown.Item>
                        <Dropdown.Item onClick={this.utlevert}>Utlevert</Dropdown.Item>
                        <Dropdown.Item onClick={this.transport}>Under transport</Dropdown.Item>
                        <Dropdown.Item onClick={this.savnet}>Savnet</Dropdown.Item>
                        <Dropdown.Item onClick={this.ferdig}>Levert tilbake</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                    <br />
                    <br />
                  </div>
                </Col>
                <Col>
                  <div id="bekreftelse" className="tabeller">
                    {/*Tabell som viser innholdet i bestillingen*/}
                    <Table striped bordered hover size="sm" xs={2}>
                      <thead>
                        <tr>
                          <th className="text-center">ID</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.varer.map(vare => (
                          <tr key={vare.v_id}>
                            <td className="text-center">{vare.v_id}</td>
                            <td>{vare.type}</td>
                            <td>{vare.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          ))}
          <Modal.Footer>
            {/*Mulighet for å slette en bestilling*/}
            <Button variant="danger" onClick={this.visSikkerPop}>
              Slett bestilling
            </Button>
            <Button variant="secondary" onClick={this.skjulInfoPop}>
              Gå tilbake
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Popup som kommer opp når man trykker på slett på en bestilling*/}
        <Modal size="sm" show={this.state.sikkerPop} onHide={this.skjulSikkerPop}>
          <Modal.Header closeButton>
            <Modal.Title>Sikker?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Er du sikker på at du ønsker å slette denne bestillingen?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulSikkerPop}>
              Gå tilbake
            </Button>
            <Button variant="danger" onClick={this.slett}>
              Slett
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Popup som kommer opp når man har slettet en bestilling*/}
        <Modal size="sm" show={this.state.slettPop} onHide={this.skjulSlettPop}>
          <Modal.Header closeButton>
            <Modal.Title>Slettet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bestillingen er slettet</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulSlettPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  // Metode som kjører når man henter inn siden
  mounted() {
    s_bestilling.Bestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }

  // Metode som søker opp bestillingene til navnet man skriver inn
  sok() {
    s_bestilling.SokNavn(this.navn, bestillinger => {
      this.bestillinger = bestillinger;
    });
  }

  // Metode som henter informasjon om en bestilling og informasjon om varene i den
  hent() {
    // Bruker b_id'en til å hente infor om bestillingen
    s_bestilling.InfoBestilling(this.b_id, valgt => {
      this.valgt = valgt;
    });
    // Bruker b_id'en til å hente info om varene i bestillingen
    s_bestilling.InfoBestillingVarer(this.b_id, varer => {
      this.varer = varer;
    });
    this.visInfoPop();
  }

  // Metode som setter status til bestilt
  bestilt() {
    // Går gjennom varene og setter statusen på bestillingen til "bestilt" og varene til "på lager"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Bestilt(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  // Metode som setter status til utlevert
  utlevert() {
    // Går gjennom varene og setter statusen på bestillingen til "utlevert" og varene til "utleid"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Utlevert(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  // Metode som setter status til transport
  transport() {
    // Går gjennom varene og setter statusen på bestillingen til "transporteres" og varene til "transporteres"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Transport(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  // Metode som setter status til savnet
  savnet() {
    // Går gjennom varene og setter statusen på bestillingen til "savnet" og varene til "savnet"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Savnet(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  // Metode som setter status til ferdig
  ferdig() {
    // Går gjennom varene og setter statusen på bestillingen til "ferdig" og varene til "på lager"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Ferdig(this.varer[i].v_id, this.b_id);
    }
    this.mounted();
    this.hent();
  }

  // Metode for å slette bestilling
  slett() {
    // Går gjennom varene og setter status til "på lager"
    for (var i = 0; i < this.varer.length; i++) {
      s_statuser.Ferdig(this.varer[i].v_id, this.b_id);
    }
    // Fjerner bestillingen
    s_slett.Bestilling(this.b_id);

    this.hent();

    this.skjulInfoPop();
    this.skjulSikkerPop();
    this.visSlettPop();
    setTimeout(() => {
      this.mounted();
    }, 250);
  }
}
