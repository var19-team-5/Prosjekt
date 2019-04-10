import * as React from 'react';
// Metoder som blir hentet fra services
import { s_utstyr } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table } from 'react-bootstrap';
//henter Status siden fra navbar
import { Status } from './nav';

// Klasse som viser tabell med alt utstyr
export class StatusUtstyr extends Status {
  utstyr = [];

  render() {
    return [
      //Tabell som viser alt utstyr
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
          {/*Henter alle fra alt_utstyr*/}
            {this.utstyr.map(utstyr => (
              <tr key={utstyr.v_id}>
                <td className="text-center">{utstyr.v_id}</td>
                <td>{utstyr.type}</td>
                <td>{utstyr.status}</td>
                <td className="text-center">{utstyr.pris}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ];
  }
  // Metode som kjører når man henter inn siden
  mounted() {
    //henter utstyret fra en spørring i metoden AltUtstyr, som henter alt utstyr fra alt_utstyr
    s_utstyr.AltUtstyr(utstyr => {
      this.utstyr = utstyr;
    });
  }
}
