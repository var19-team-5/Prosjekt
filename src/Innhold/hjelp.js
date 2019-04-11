import * as React from 'react';
import { Component } from 'react-simplified';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { ListGroup, Col, Image } from 'react-bootstrap';

// Klasse under hjelp  med bilder og test
export class Hjelp extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Brukerveiledning</h1>
        <p> Her kommer en brukerveiledning til hvordan man gjør en bestilling i SUSU.</p>
      </React.Fragment>
    );
  }
}
