import * as React from 'react';
// Metoder som blir hentet fra services
import { s_varer } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table } from 'react-bootstrap';
//henter Status siden fra navbar
import { Status } from './nav';

// Klasse som viser tabell med alle varer
export class Varer extends Status {
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
            {/*Henter alle fra alle_varer*/}
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

  // Metode som kjører når man henter inn siden
  mounted() {
    //henter varene fra en spørring i metoden AlleVarer, som henter alle varer fra alle_varer
    s_varer.AlleVarer(varer => {
      this.varer = varer;
    });
  }
}
