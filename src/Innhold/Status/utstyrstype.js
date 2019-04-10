import * as React from 'react';
// Metoder som blir hentet fra services
import { s_utstyr } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table } from 'react-bootstrap';
//henter StatusUtstyr siden fra navbar
import { StatusUtstyr } from './utstyr';

// Klasse som viser tabell for valgt utstyrstype
export class StatusUtstyrType extends StatusUtstyr {
  utstyr = [];

  render() {
    return [
      //Tabell som viser utstyr med valgt type
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
          {/*Går gjennom utstyret og velger riktig type*/}
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
    //henter utstyret fra en spørring i metoden UtstyrType, som henter alt utstyr med valgt type
    s_utstyr.UtstyrType(this.props.match.params.type, utstyr => {
      this.utstyr = utstyr;
    });
  }
}
