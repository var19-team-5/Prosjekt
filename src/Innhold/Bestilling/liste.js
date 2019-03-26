import * as React from 'react';
import { s_hent } from './../../services';
import { Table } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingListe extends Bestilling {
  bestillinger = [];

  render() {
    return (
      <div class='table'>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Bestillings ID</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Kunde</th>
            <th>Hentested</th>
            <th>Leveringssted</th>
            <th>Rabatt</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.bestillinger.map(bestilling => (
            <tr key={bestilling.b_id}>
              <td>{bestilling.b_id}</td>
              <td>
                {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(bestilling.fra)}
              </td>
              <td>
                {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(bestilling.til)}
              </td>
              <td>{bestilling.navn}</td>
              <td>{bestilling.hentested}</td>
              <td>{bestilling.leveringssted}</td>
              <td>{bestilling.rabatt}</td>
              <td>{bestilling.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    );
  }
  mounted() {
    s_hent.Bestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
}
