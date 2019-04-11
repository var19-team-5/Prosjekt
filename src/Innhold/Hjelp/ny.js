import * as React from 'react';
//Henter komponentene i react bootstrap som vi bruker i denne filen
import { ListGroup, Col, Image } from 'react-bootstrap';
//Henter navigasjonsbaren fra nav
import { Hjelp } from './nav';

// Klasse under hjelp - ny med bilder og test
export class HNy extends Hjelp {
  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h2>Brukerveiledning:</h2>
          <p> Her kommer en brukerveiledning til hvordan man bruker programmet SUSU.</p>
          <ListGroup.Item className="list-group-item">
            <div id="hjelp2" className="tabeller">
              <Col>
                <h4>Punkt 1</h4>
                <p>
                  {' '}
                  Her ser man et oversiktsbilde av "Ny" siden, hvor man kan legge til en ny vare, lokasjon, restriksjon
                  eller endre en pris. Nedenfor følger en forklaring på hvordan man foretar seg noe.
                </p>
                <Image id="h7" className="img-thumbnail" src="./Nyvare/su1.jpg" class="instruksjon" />

                <h4>Punkt 2</h4>
                <p>
                  Her velger man først hva man vil legge til eller endre, fyller så ut nødvendig informasjon og trykker
                  på "Ny type" eller "Legg til".{' '}
                </p>
                <Image id="h8" className="img-thumbnail" src="./Nyvare/su2.jpg" alt="instruksjon" />

                <h3>Punkt 3</h3>
                <p>
                  Man får så opp en pop-up boks hvor man må bekrefte at informasjonen er korrekt, derretter er det du
                  ønsket å endre/legge til inne i systemet.{' '}
                </p>
                <Image id="h9" className="img-thumbnail" src="./Nyvare/su3.jpg" alt="instruksjon" />

                <h4>Punkt 4</h4>
                <p>Et eksempel på at en ny sykkel er lagt til</p>

                <Image id="h10" className="img-thumbnail" src="./Nyvare/su4.jpg" alt="instruksjon" />
              </Col>
            </div>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    );
  }
}
