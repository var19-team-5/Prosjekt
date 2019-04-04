import * as React from 'react';
import { s_ny, s_hent, s_typer } from './../../services';
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class NyUtstyr extends Ny {
  steder = [];
  typerUtstyr = [];

  nytype = '';
  nypris = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Form.Label>Type utstyr:</Form.Label>
          <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
            {this.typerUtstyr.map(typeUtstyr => (
              <option key={typeUtstyr.type} value={typeUtstyr.type}>
                {typeUtstyr.type}
              </option>
            ))}
            <br />
          </Form.Control>
        </ListGroup.Item>

        <ListGroup.Item className="list-group-item">
          <h5>Ligger ikke typen inne? Legg til ny her!</h5>
          <Row>
            <Col>
              <Form.Label>Ny type:</Form.Label>
              <Form.Control onChange={e => (this.nytype = e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.nypris = e.target.value)} />
              <br />
            </Col>
          </Row>
          <Button onClick={this.nyTypeUtstyr}>Legg til ny type</Button>
        </ListGroup.Item>

        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Form.Label>Tilhører:</Form.Label>
            <Form.Control id="test" as="select" onChange={e => (this.tilhører = e.target.value)}>
              {this.steder.map(sted => (
                <option key={sted.lokasjon} value={sted.tilhører}>
                  {sted.lokasjon}
                </option>
              ))}
            </Form.Control>
            <br/>
            <Button onClick={this.nyUtstyr}>Legg til nytt utstyr</Button>

          </ListGroup.Item>

        </Form.Group>
      </React.Fragment>
    ];
  }

  mounted() {
    s_typer.alleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      this.type = typerUtstyr[0].type;
    });
    s_hent.Steder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  nyUtstyr() {
    s_ny.Utstyr(this.tilhører, this.type);
  }
  nyTypeUtstyr() {
    s_ny.TypeUtstyr(this.nytype, this.nypris);
  }
}
