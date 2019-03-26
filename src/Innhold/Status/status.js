import * as React from 'react';
import { s_sok } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusStatus extends Status {
  varer = [];

  render() {
    return [
      <div class='table'>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="text-center">Vare ID</th>
            <th>Type</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th className="text-center">Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.varer.map(vare => (
            <tr key={vare.v_id}>
              <td className="text-center">{vare.v_id}</td>
              <td>{vare.type}</td>
              <td>{vare.lokasjon}</td>
              <td>{vare.status}</td>
              <td className="text-center">{vare.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    ];
  }

  mounted() {
    s_sok.VarerStatus(this.props.match.params.status, varer => {
      this.varer = varer;
    });
  }
}
