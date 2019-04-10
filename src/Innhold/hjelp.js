import * as React from 'react';
import { Component } from 'react-simplified';
import { Col, Image } from 'react-bootstrap';

export class Hjelp extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Brukerveiledning, hvordan gjøre en bestilling</h1>
        <p> Her kommer en brukerveiledning til hvordan man gjør en bestilling i SUSU.</p>
        <Col>
          <h3>Punkt 1</h3>
          <p>
            {' '}
            Her ser man et oversiktsbilde av bestillingssiden. Nedenfor følger en forklaring på hvordan man gjør en
            bestilling.
          </p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu1.jpg" class="instruksjon" />

          <h3>Punkt 2</h3>
          <p>
            {' '}
            Man fyller først inn mobilnummer, navn og mailadresse. Ligger mobilnummer i databasen fra tidligere kommer
            navn og mailadresse automatisk opp. Deretter velger man hvilke datoer og klokkeslett man ønsker å leie
            utstyret og fra/til hvilke lokasjoner det skal hentes/leveres.
          </p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu2.jpg" alt="instruksjon" />

          <h3>Punkt 3</h3>
          <p>
            {' '}
            Man skal så velge de varene man ønsker å leie. Man huker av i checkboksen for å legge varen i handlekurven.
          </p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu3.jpg" alt="instruksjon" />

          <h3>Punkt 4</h3>
          <p>
            Slik ser handlekurven ut, man får en oversikt over valgte varer, samt mulighet til å fjerne varer. Man ser
            antall varer, rabatt og pris for leien. Man har også mulighet til å nullstille bestillingsskjemaet.
          </p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu4.jpg" alt="instruksjon" />

          <h3>Punkt 5</h3>
          <p>
            {' '}
            Når man trykker knappen «ny bestilling» dukker denne boksen opp. Her får man full oversikt over bestillingen
            man har lagt inn, og man kan enten fullføre bestillingen eller gå tilbake om noe er feil.
          </p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu5.jpg" alt="instruksjon" />

          <h3>Punkt 6</h3>
          <p> Etter fullført bestilling får man en bekreftelse på at bestillingen er lagt til i systemet.</p>
          <Image className="img-thumbnail" src="./Brukerveiledning/susu6.jpg" alt="instruksjon" />
        </Col>
      </React.Fragment>
    );
  }
}
