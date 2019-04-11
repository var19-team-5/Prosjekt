import * as React from 'react';
import { Component } from 'react-simplified';
import { ListGroup, Col, Image } from 'react-bootstrap';
import { Hjelp } from './nav';

export class Hjelpny extends Hjelp {
  render() {
    return (
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <h2>Brukerveiledning:</h2>
          <p> Her kommer en brukerveiledning til hvordan man bruker programmet SUSU.</p>
          <ListGroup.Item className="list-group-item">
            <div id="hjelp" className="tabeller">
              <Col>
                <h4>Punkt 1</h4>
                <p>
                  {' '}
                  Her ser man et oversiktsbilde av "Ny" siden, hvor man kan legge til en ny vare, lokasjon, restriksjon
                  eller endrer en pris. Nedenfor følger en forklaring på hvordan man foretar seg noe.
                </p>
                <Image id="h1" className="img-thumbnail" src="./Nyvare/su1.jpg" class="instruksjon" />

                <h4>Punkt 2</h4>
                <p>
                  Her velger man først hva man vil legge til eller endre, fyller så ut nødvendig informasjon og trykker
                  på "Ny type" eller "Legg til".{' '}
                </p>
                <Image id="h2" className="img-thumbnail" src="./Nyvare/su2.jpg" alt="instruksjon" />

                <h3>Punkt 3</h3>
                <p>
                  Man får så opp en pop-up boks hvor man må bekrefte at informasjonen er korrekt, derretter er det du
                  ønsket å endre/legge til inne i systemet.{' '}
                </p>
                <Image id="h3" className="img-thumbnail" src="./Nyvare/su3.jpg" alt="instruksjon" />

                <h4>Punkt 4</h4>
                <p>Et eksempel på at en ny sykkel er lagt til</p>

                <Image id="h4" className="img-thumbnail" src="./Nyvare/su4.jpg" alt="instruksjon" />
              </Col>
            </div>
          </ListGroup.Item>
        </ListGroup.Item>
      </React.Fragment>
    );
  }
}