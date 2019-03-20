import * as React from 'react';
import { s_sok } from './../../services';
import { Table } from 'react-bootstrap';

import { StatusSykler } from './sykler';

export class StatusSyklerType extends StatusSykler {
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
            <th>Storrelse på hjul</th>
            <th>Befinner seg</th>
            <th>Status</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {this.sykler.map(sykkel => (
            <tr key={sykkel.v_id}>
              <td>{sykkel.v_id}</td>
              <td>{sykkel.type}</td>
              <td>{sykkel.ramme}</td>
              <td>{sykkel.girsystem}</td>
              <td>{sykkel.størrelse_hjul}</td>
              <td>{sykkel.lokasjon}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.pris}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ];
  }
  mounted() {
    s_sok.SyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
  }
}
