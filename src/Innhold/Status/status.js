import * as React from 'react';
import { s_sok } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusStatus extends Status {
  varer = [];

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
          {this.varer.map(vare => (
            <tr key={vare.v_id}>
              <td>{vare.v_id}</td>
              <td>{vare.type}</td>
              <td>{vare.lokasjon}</td>
              <td>{vare.status}</td>
              <td>{vare.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }

  mounted() {
    s_sok.VarerStatus(this.props.match.params.status, varer => {
      this.varer = varer;
    });
  }
}
