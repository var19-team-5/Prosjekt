import * as React from 'react';
// Metoder som blir hentet fra services
import { s_sykler } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table } from 'react-bootstrap';
//henter Status siden fra navbar
import { Status } from './nav';

// Klasse som viser tabell med alle sykler
export class StatusSykler extends Status {
  alle_sykler = [];

  render() {
    return [
      //Tabell som viser alle sykler
      <div id="status" className="tabeller">
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
          {/*Henter alle fra alle_sykler*/}
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
  // Metode som kjører når man henter inn siden
  mounted() {
    //henter syklene fra en spørring i metoden AlleSykler, som henter alle sykler fra alle_sykler
    s_sykler.AlleSykler(alle_sykler => {
      this.alle_sykler = alle_sykler;
    });
  }
}
