import * as React from 'react';
import { s_hent } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusSykler extends Status {
  sykler = [];

  render() {
    return [
      <div className="status">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center">Vare ID</th>
              <th>Type</th>
              <th>Ramme</th>
              <th className="text-center">Girsystem</th>
              <th className="text-center">Størrelse på hjul</th>
              <th>Status</th>
              <th className="text-center">Pris</th>
            </tr>
          </thead>
          <tbody>
            {this.alle_sykler.map(alle_sykler => (
              <tr key={alle_sykler.v_id}>
                <td className="text-center">{alle_sykler.v_id}</td>
                <td>{alle_sykler.type}</td>
                <td>{alle_sykler.ramme}</td>
                <td className="text-center">{alle_sykler.girsystem}</td>
                <td className="text-center">{alle_sykler.størrelse_hjul}</td>
                <td>{alle_sykler.status}</td>
                <td className="text-center">{alle_sykler.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ];
  }
  mounted() {
    s_hent.Sykler(sykler => {
      this.sykler = sykler;
    });
  }
}
