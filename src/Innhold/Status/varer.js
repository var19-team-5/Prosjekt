import * as React from 'react';
import { s_varer } from './_s_services';
import { Table } from 'react-bootstrap';
import { Status } from './nav';

export class StatusVarer extends Status {
  varer = [];
  lokasjoner = [];

  render() {
    return [
      <div id="status" className="tabeller">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center">Vare ID</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">Pris</th>
            </tr>
          </thead>
          <tbody>
            {this.varer.map(alle_varer => (
              <tr key={alle_varer.v_id}>
                <td className="text-center">{alle_varer.v_id}</td>
                <td>{alle_varer.type}</td>
                <td>{alle_varer.status}</td>
                <td className="text-center">{alle_varer.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ];
  }

  mounted() {
    s_varer.AlleVarer(varer => {
      this.varer = varer;
    });
  }
}
