import * as React from 'react';
import { s_hent } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusUtstyr extends Status {
  utstyr = [];

  render() {
    return [
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td>{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.lokasjon}</td>
              <td>{utstyr.status}</td>
              <td>{utstyr.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    s_hent.Utstyr(utstyr => {
      this.utstyr = utstyr;
    });
  }
}
