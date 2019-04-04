import * as React from 'react';
import { s_sok } from './../../services';
import { Table } from 'react-bootstrap';

import { StatusUtstyr } from './utstyr';

export class StatusUtstyrType extends StatusUtstyr {
  utstyr = [];

  render() {
    return [
      <div className='status'>
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
          {this.utstyr.map(utstyr => (
            <tr key={utstyr.v_id}>
              <td className="text-center">{utstyr.v_id}</td>
              <td>{utstyr.type}</td>
              <td>{utstyr.lokasjon}</td>
              <td>{utstyr.status}</td>
              <td className="text-center">{utstyr.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    ];
  }
  mounted() {
    s_sok.UtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
  }
}
