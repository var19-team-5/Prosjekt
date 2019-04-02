import * as React from 'react';
import { s_sok, s_endre } from './../../services';
import { Table, Modal, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { Status } from './nav';

export class StatusSok extends Status {
  constructor(props, context) {
    super(props, context);

    this.visInfoPop = this.visInfoPop.bind(this);
    this.skjulInfoPop = this.skjulInfoPop.bind(this);

    this.state = {
      infoPop: false
    };
  }

  skjulInfoPop() {
    this.setState({ infoPop: false });
  }

  visInfoPop() {
    this.setState({ infoPop: true });
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
              <th>Befinner seg</th>
              <th>Status</th>
              <th className="text-center">Pris</th>
              <th className="text-center">Endre status</th>
            </tr>
          </thead>
          <tbody>
            {this.vare.map(vare => (
              <tr key={vare.v_id}>
                <td className="text-center">{vare.v_id}</td>
                <td>{vare.type}</td>
                <td>{vare.lokasjon}</td>
                <td>{vare.status}</td>
                <td className="text-center">{vare.pris}</td>
                <div className="text-center">
                  <Button value={vare.v_id} onClick={e => (this.v_id = e.target.value) && this.hent(e)}>
                    Endre
                  </Button>
                </div>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal centered size="lg" show={this.state.infoPop} onHide={this.skjulInfoPop}>
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
                </DropdownButton>
              </ButtonGroup>
            </Modal.Body>
          ))}

          <Modal.Footer>
            <Button variant="secondary" onClick={this.skjulInfoPop}>
              Gå tilbake
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
}
