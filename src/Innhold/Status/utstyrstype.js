import * as React from 'react';
import { s_sok } from './../../services';
import { Table } from 'react-bootstrap';

import { StatusUtstyr } from './utstyr';

export class StatusUtstyrType extends StatusUtstyr {
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
    s_sok.UtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
  }
}
