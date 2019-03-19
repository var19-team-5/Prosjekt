import * as React from 'react';
import { s_hent } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusVarer extends Status {
  varer = [];
  lokasjoner = [];

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
          {this.varer.map(alle_varer => (
            <tr key={alle_varer.v_id}>
              <td>{alle_varer.v_id}</td>
              <td>{alle_varer.type}</td>
              <td>{alle_varer.lokasjon}</td>
              <td>{alle_varer.status}</td>
              <td>{alle_varer.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }

  mounted() {
    s_hent.Varer(varer => {
      this.varer = varer;
    });
  }
}
