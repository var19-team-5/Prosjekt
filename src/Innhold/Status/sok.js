import * as React from 'react';
import { s_sok, s_endre, s_slett } from './../../services';
import { Table, Modal, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { Status } from './nav';

export class Sok extends Status {
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

  skjulInfoPop() {
    this.setState({ infoPop: false });
  }

  visInfoPop() {
    this.setState({ infoPop: true });
  }
  skjulSikkerPop() {
    this.setState({ sikkerPop: false });
  }

  visSikkerPop() {
    this.setState({ sikkerPop: true });
  }

  skjulSlettPop() {
    this.setState({ slettPop: false });
  }

  visSlettPop() {
    this.setState({ slettPop: true });
  }

  vare = [];

  render() {
    return [
      <React.Fragment>
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
            {this.vare.map(vare => (
              <tr key={vare.v_id}>
                <td className="text-center">{vare.v_id}</td>
                <td>{vare.type}</td>
                <td>{vare.status}</td>
                <td className="text-center">{vare.pris}</td>
                <div className="text-center">
                  <Button value={vare.v_id} onClick={e => (this.v_id = e.target.value) && this.hent(e)}>
                    Info
                  </Button>
                </div>
              </tr>
            ))}
          </tbody>
        </Table>

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
                <DropdownButton as={ButtonGroup} title="Endre status" id="bg-nested-dropdown">
                  <Dropdown.Item onClick={this.lager}>På lager</Dropdown.Item>
                  <Dropdown.Item onClick={this.trengerRep}>Trenger reperasjon</Dropdown.Item>
                  <Dropdown.Item onClick={this.påRep}>På reperasjon</Dropdown.Item>
                  <Dropdown.Item onClick={this.savnet}>savnet</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Modal.Body>
          ))}

          <Modal.Footer>
            <Button variant="danger" onClick={this.visSikkerPop}>
              Slett
            </Button>
            <Button variant="secondary" onClick={this.skjulInfoPop}>
              Gå tilbake
            </Button>
          </Modal.Footer>
        </Modal>

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

  mounted() {
    s_sok.Vare(this.props.match.params.v_id, vare => {
      this.vare = vare;
    });
  }
  hent() {
    this.visInfoPop();
  }
  lager() {
    s_endre.Lager(this.v_id);
    this.mounted();
  }
  trengerRep() {
    s_endre.trengerRep(this.v_id);
    this.mounted();
  }
  påRep() {
    s_endre.Rep(this.v_id);
    this.mounted();
  }
  savnet() {
    s_endre.savnet(this.v_id);
    this.mounted();
  }
  slett() {
    s_slett.Vare(this.v_id);
    this.skjulInfoPop();
    this.skjulSikkerPop();
    this.visSlettPop();
    this.vare = [];
  }
}
