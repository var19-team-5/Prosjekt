import * as React from 'react';
// Metoder som blir hentet fra services
import { s_sykler } from './_s_services';
// Komponenter som blir brukt i dokumentet
import { Table } from 'react-bootstrap';
//henter StatusSykler siden fra navbar
import { StatusSykler } from './sykler';

// Klasse som viser tabell for valgt sykkeltype
export class StatusSyklerType extends StatusSykler {
  sykler = [];

  render() {
    return [
      //Tabell som viser sykler med valgt type
      <div id="status" className="tabeller">
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
          {/*Går gjennom syklene og velger riktig type*/}
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
  // Metode som kjører når man henter inn siden
  mounted() {
    //henter syklene fra en spørring i metoden SyklerType, som henter alle sykler med valgt type
    s_sykler.SyklerType(this.props.match.params.type, sykler => {
      this.sykler = sykler;
    });
  }
}
