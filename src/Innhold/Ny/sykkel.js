import * as React from 'react';
import { s_ny, s_hent, s_typer } from './../../services';
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';

import { Ny } from './nav';

export class NySykkel extends Ny {
  steder = [];
  typerSykler = [];

  nytype = '';
  nypris = '';

  ramme = '';
  girsystem = '';
  størrelse_hjul = '';

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Form.Label>Type sykkel:</Form.Label>
          <Form.Control as="select" onChange={e => (this.type = e.target.value)}>
            {this.typerSykler.map(typeSykkel => (
              <option key={typeSykkel.type} value={typeSykkel.type}>
                {typeSykkel.type}
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
              <Form.Control onChange={e => (this.nytype = e.target.value)} placeholder='navn' />
            </Col>
            <Col>
              <Form.Label>Pris:</Form.Label>
              <Form.Control type="number" onChange={e => (this.nypris = e.target.value)} placeholder='00,00'/>
              <br />
            </Col>
          </Row>
          <Button onClick={this.nyTypeSykkel}>Legg til ny type</Button>
        </ListGroup.Item>

        <Form.Group>
          <ListGroup.Item className="list-group-item">
            <Row>
              <Col>
                <Form.Label>Tilhører:</Form.Label>
                <Form.Control as="select" onChange={e => (this.tilhører = e.target.value)}>
                  {this.steder.map(sted => (
                    <option key={sted.lokasjon} value={sted.tilhører}>
                      {sted.lokasjon}
                    </option>
                  ))}
                  <br />
                </Form.Control>
              </Col>

              <Col>
                <Form.Label>Ramme:</Form.Label>
                <Form.Control onChange={e => (this.ramme = e.target.value)} placeholder='navn'/>
              </Col>
              <Col>
                <Form.Label>Girsystem:</Form.Label>
                <Form.Control type="number" onChange={e => (this.girsystem = e.target.value)} placeholder='00'/>
              </Col>
              <Col>
                <Form.Label>Storrese hjul:</Form.Label>
                <Form.Control type="number" onChange={e => (this.størrelse_hjul = e.target.value)} placeholder='00'/>
                <br />
              </Col>
            </Row>
            <Button onClick={this.nySykkel}>Legg til ny sykkel</Button>
          </ListGroup.Item>
        </Form.Group>
      </React.Fragment>
    ];
  }

  mounted() {
    s_typer.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      this.type = typerSykler[0].type;
    });
    s_hent.Steder(steder => {
      this.steder = steder;
      this.tilhører = steder[0].lokasjon;
    });
  }
  nySykkel() {
    s_ny.Sykkel(this.tilhører, this.type, this.ramme, this.girsystem, this.størrelse_hjul);
  }
  nyTypeSykkel() {
    s_ny.TypeSykkel(this.nytype, this.nypris);
  }
}
