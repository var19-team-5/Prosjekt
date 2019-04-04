import * as React from 'react';
import { s_typer, s_ny } from './../../services';
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class NyRestriksjon extends Ny {
  typerSykler = [];
  typerUtstyr = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col>
              <Form.Label>Type sykkel:</Form.Label>
              <Form.Control id="s_type" as="select" onChange={e => (this.s_type = e.target.value)}>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Type Utstyr:</Form.Label>
              <Form.Control id="u_type" as="select" onChange={e => (this.u_type = e.target.value)}>
                {this.typerUtstyr.map(typerUtstyr => (
                  <option key={typerUtstyr.type} value={typerUtstyr.type}>
                    {typerUtstyr.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <br />
          <Button onClick={this.nyRestriksjon}>Legg til ny restriksjon</Button>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }
  mounted() {
    s_typer.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      document.getElementById('s_type').value = this.typerSykler[0].type;
    });

    s_typer.alleUtstyrTyper(typerUtstyr => {
      this.typerUtstyr = typerUtstyr;
      document.getElementById('u_type').value = this.typerUtstyr[0].type;
    });
  }
  nyRestriksjon() {
    s_ny.Restriksjon(this.s_type, this.u_type);
  }
}
