import * as React from 'react';
// Metoder som blir hentet fra services
import { s_status, s_slett, s_sok } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table, Modal, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
//henter Status siden fra navbar
import { Status } from './nav';

// Klasse som viser tabell for valgt status
export class SStatus extends Status {
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

  // Skjul og vis popup informasjon om en vare
  skjulInfoPop() {
    this.setState({ infoPop: false });
  }
  visInfoPop() {
    this.setState({ infoPop: true });
  }
  // Skjul og vis popup for bekreftelse på å slette en vare
  skjulSikkerPop() {
    this.setState({ sikkerPop: false });
  }
  visSikkerPop() {
    this.setState({ sikkerPop: true });
  }
  // Skjul og vis popup når en har slettet en vare
  skjulSlettPop() {
    this.setState({ slettPop: false });
  }
  visSlettPop() {
    this.setState({ slettPop: true });
  }

  varer = [];
  vare = [];

  render() {
    return [
      <React.Fragment>
        {/*Tabell som viser varen med valgt status*/}
        <div id="status" className="tabeller">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">Vare ID</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-center">Pris</th>
                <th className="text-center">Mer info</th>
              </tr>
            </thead>
            <tbody>
              {/*Går gjennom varene velger riktig status*/}
              {this.varer.map(vare => (
                <tr key={vare.v_id}>
                  <td className="text-center">{vare.v_id}</td>
                  <td>{vare.type}</td>
                  <td>{vare.status}</td>
                  <td className="text-center">{vare.pris}</td>
                  <div className="text-center">
                    {/*Knapp for å lese mer informasjon om en vare og kunne endre status eller fjerne varen*/}
                    <Button value={vare.v_id} onClick={e => (this.v_id = e.target.value) && this.hent(e)}>
                      Info
                    </Button>
                  </div>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/*Popup for å vise informasjon om en vare*/}
        <Modal centered size="sm" show={this.state.infoPop} onHide={this.skjulInfoPop}>
          <Modal.Header closeButton>
            {this.vare.map(vare => (
              <Modal.Title>Vare {vare.v_id}</Modal.Title>
            ))}
          </Modal.Header>
          {this.vare.map(vare => (
            <Modal.Body>
              Vare ID: {vare.v_id} <br />
              Type: {vare.type} <br />
              Status: {vare.status} <br />
              Pris: {vare.pris} <br />
              <br />
              <ButtonGroup>
                {/*Dropdown-meny for å kunne endre status på en vare*/}
                <DropdownButton as={ButtonGroup} title="Endre status" id="bg-nested-dropdown">
                  <Dropdown.Item onClick={this.lager}>På lager</Dropdown.Item>
                  <Dropdown.Item onClick={this.trengerRep}>Trenger reparasjon</Dropdown.Item>
                  <Dropdown.Item onClick={this.påRep}>På reparasjon</Dropdown.Item>
                  <Dropdown.Item onClick={this.savnet}>savnet</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Modal.Body>
          ))}

          <Modal.Footer>
            {/*Mulighet for å slette en vare*/}
            <Button variant="danger" onClick={this.visSikkerPop}>
              Slett
            </Button>
            <Button variant="secondary" onClick={this.skjulInfoPop}>
              Gå tilbake
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Popup som kommer opp når man trykker på slett på en vare*/}
        <Modal size="sm" show={this.state.sikkerPop} onHide={this.skjulSikkerPop}>
          <Modal.Header closeButton>
            <Modal.Title>Sikker?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Er du sikker på at du ønsker å slette denne varen?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulSikkerPop}>
              Gå tilbake
            </Button>
            <Button variant="danger" onClick={this.slett}>
              Slett
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Popup som kommer opp når man har slettet en vare*/}
        <Modal size="sm" show={this.state.slettPop} onHide={this.skjulSlettPop}>
          <Modal.Header closeButton>
            <Modal.Title>Slettet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Varen er slettet</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulSlettPop}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    ];
  }

  // Metode som kjører når man henter inn siden
  mounted() {
    s_status.VarerStatus(this.props.match.params.status, varer => {
      this.varer = varer;
    });
  }
  // Metode som henter informasjon om varen
  hent() {
    s_sok.Vare(this.v_id, vare => {
      this.vare = vare;
      this.visInfoPop();
    });
  }
  // Metode som setter status til på lager
  lager() {
    s_status.PåLager(this.v_id);
    this.mounted();
    this.skjulInfoPop();
  }
  // Metode som setter status til trenger reparasjon
  trengerRep() {
    s_status.TrengerReparasjon(this.v_id);
    this.mounted();
    this.skjulInfoPop();
  }
  // Metode som setter status til på reparasjon
  påRep() {
    s_status.PåReparasjon(this.v_id);
    this.mounted();
    this.skjulInfoPop();
  }
  // Metode som setter status til savnet
  savnet() {
    s_status.Savnet(this.v_id);
    this.mounted();
    this.skjulInfoPop();
  }
  // Metode for å slette en vare
  slett() {
    // Fjerner varen
    s_slett.Vare(this.v_id);

    this.skjulInfoPop();
    this.skjulSikkerPop();
    this.visSlettPop();
    this.vare = [];
  }
}
