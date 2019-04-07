import * as React from 'react';
import { s_sykler } from './_s_services';
import { Table } from 'react-bootstrap';

import { StatusSykler } from './sykler';

export class StatusSyklerType extends StatusSykler {
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
              <th className="text-center">Storrelse på hjul</th>
              <th>Status</th>
              <th className="text-center">Pris</th>
            </tr>
          </thead>
          <tbody>
            {this.sykler.map(sykkel => (
              <tr key={sykkel.v_id}>
                <td className="text-center">{sykkel.v_id}</td>
                <td>{sykkel.type}</td>
                <td>{sykkel.ramme}</td>
                <td className="text-center">{sykkel.girsystem}</td>
                <td className="text-center">{sykkel.størrelse_hjul}</td>
                <td>{sykkel.status}</td>
                <td className="text-center">{sykkel.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ];
  }
  mounted() {
    s_sykler.SyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
  }
}
