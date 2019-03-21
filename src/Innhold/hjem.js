import * as React from 'react';
import { Component } from 'react-simplified';
import { Card } from 'react-bootstrap';

export class Home extends Component {
  render() {
    return (
      <Card>
        Til SUSU v5.2!
        <br />
        Dette er verdens beste informasjonssystem for utleie av sykler og utstyr.
      </Card>
    );
  }
}
