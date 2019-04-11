import * as React from 'react';
import { Component } from 'react-simplified';
//Henter navigasjonsbaren fra nav
import { ListGroup } from 'react-bootstrap';

// Klassen med teksten under siden info
export class Info extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <br />
          <h2>Hva er SUSU?</h2>
          <h6>Sykkelutleie for sykler og utstyr!</h6>
          <br />
          <ListGroup.Item className="list-group-item">
            <p>SUSU er et informasjonssystem for administrering av sykkelutleie. </p>
            <p>
              Applikasjonen er utviklet av fire studenter i forbindelse med et prosjekt i emnet IDRI1005,
              Objektorientert
            </p>
            <p> Et emne man har andre semester på studiet Digital Forretningsutvikling ved NTNU. </p>
            <p> Team 5 består av Ane Solberg Nielsen, Malin Tollaksen, Sawsen Boudabous og Martin Riseth. </p>
            <br />
            <br />
            <p>Versjon 1</p>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    );
  }
}
