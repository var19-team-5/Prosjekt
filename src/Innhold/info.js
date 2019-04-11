import * as React from 'react';
import { Component } from 'react-simplified';
import {} from 'react-bootstrap';

export class Info extends Component {
  render() {
    return (
      <React.Fragment>
        <br />
        <h1>Hva er SUSU?</h1>
        <br />
        <h6>"Sykkelutleie for sykler og utstyr"</h6>
        <br />
        <br />
        <p>
          SUSU er et informasjonssystem for administrering av sykkelutleie. SUSU er utviklet av fire studenter i
          <br />
          forbindelse med et prosjekt i emnet IDRI1005, Objektorientert programmering med systemarbeid. Et emne man har
          <br />
          i andre semester på studiet Digital Forretningsutvikling ved NTNU. Team 5 består av Ane Solberg Nielsen, Malin
          <br />
          Tollaksen, Sawsen Boudabous og Martin Riseth.
        </p>
      </React.Fragment>
    );
  }
}
