import * as React from 'react';
import { s_hent } from './../../services';
import { Table } from 'react-bootstrap';

import { Status } from './nav';

export class StatusSykler extends Status {
  sykler = [];

  render() {
    return [
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Vare ID</th>
            <th>Type</th>
            <th>Ramme</th>
            <th>Girsystem</th>
            <th>Størrelse på hjul</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.sykler.map(alle_sykler => (
            <tr key={alle_sykler.v_id}>
              <td>{alle_sykler.v_id}</td>
              <td>{alle_sykler.type}</td>
              <td>{alle_sykler.ramme}</td>
              <td>{alle_sykler.girsystem}</td>
              <td>{alle_sykler.størrelse_hjul}</td>
              <td>{alle_sykler.lokasjon}</td>
              <td>{alle_sykler.status}</td>
              <td>{alle_sykler.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    s_hent.Sykler(sykler => {
      this.sykler = sykler;
    });
  }
}
