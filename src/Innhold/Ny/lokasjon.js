import * as React from 'react';
import { s_ny } from './../../services';
import { Form, ListGroup, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class NyLokasjon extends Ny {
  render() {
    return (
      <Form.Group>
        <ListGroup.Item className="list-group-item">
          <Form.Label> Sted: </Form.Label>
          <Form.Control required type="text" onChange={e => (this.lokasjon = e.target.value)} />
          <br />
          <Button onClick={this.nyLokasjon}>Legg til</Button>
        </ListGroup.Item>
      </Form.Group>
    );
  }
  nyLokasjon() {
    s_ny.Lokasjon(this.lokasjon);
    alert('Lokasjonen ' + this.lokasjon + ' er lagt til!');
  }
}
