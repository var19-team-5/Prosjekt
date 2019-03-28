import * as React from 'react';
import { s_hent, s_sok } from './../../services';
import { Table, ListGroup, InputGroup, FormControl } from 'react-bootstrap';

import { Bestilling } from './nav';

export class BestillingListe extends Bestilling {
  bestillinger = [];

  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Søk på et navn!"
              aria-describedby="basic-addon2"
              type="text"
              value={this.navn}
              onInput={e => (this.navn = e.target.value)}
              onChange={this.sok}
            />
          </InputGroup>
        </ListGroup.Item>
        <div className="status">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Kunde</th>
                <th>Hentested</th>
                <th>Leveringssted</th>
                <th className="text-center">Pris</th>
                <th className="text-center">Rabatt</th>
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
                  <td className="text-center">{bestilling.pris}</td>
                  <td className="text-center">{bestilling.rabatt}</td>
                  <td>{bestilling.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
  mounted() {
    s_hent.Bestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
  sok() {
    s_sok.Bestilling(this.navn, bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
}
