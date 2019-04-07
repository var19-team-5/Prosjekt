import * as React from 'react';
import { s_lokasjon } from './_n_services';
import { Form, ListGroup, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class Lokasjon extends Ny {
  render() {
    return (
      <Form.Group>
        <ListGroup.Item className="list-group-item">
          <Form.Label> Sted: </Form.Label>
          <Form.Control required type="text" onChange={e => (this.lokasjon = e.target.value)} placeholder="Stedsnavn"/>
          <br />
          <Button onClick={this.nyLokasjon}>Legg til</Button>
        </ListGroup.Item>
      </Form.Group>
    );
  }
  nyLokasjon() {
    s_lokasjon.NyLokasjoner(this.lokasjon);
    alert('Lokasjonen ' + this.lokasjon + ' er lagt til!');
  }
}
