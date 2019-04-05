import * as React from 'react';
import { s_typer, s_ny, s_hent, s_slett} from './../../services';
import { ListGroup, Row, Col, Form, Button, Card, Table} from 'react-bootstrap';

import { Ny } from './nav';

export class NyRestriksjon extends Ny {
  typerSykler = [];
  minusUtstyr = [];
  plussUtstyr = [];

  render() {
    return [
      <React.Fragment>
        <ListGroup.Item className="list-group-item">
          <Row>
            <Col>
              <Form.Label>Type sykkel:</Form.Label>
              <Form.Control as="select" onChange={e => (this.type = e.target.value) && this.kjør(e)}>
                <option hidden>Velg sykkeltype</option>
                {this.typerSykler.map(typeSykkel => (
                  <option key={typeSykkel.type} value={typeSykkel.type}>
                    {typeSykkel.type}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
          <div>
            <br/>
            <Form.Label>Passende:</Form.Label>
          <Table striped bordered hover size="sm" xs={6}>
            <thead>
            <tr>
              <th>Utstyr</th>
              <th>-</th>
            </tr>
            </thead>
            <tbody>
            {this.minusUtstyr.map(utstyr => (
                <tr key={utstyr.type}>
                  <td>{utstyr.type}</td>
                  <td>
                    <Button onClick={e => (this.type = e.target.value) && this.fjernUtstyr(e)}>
                      -
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            </div>
          <div>
            <br/>
            <Form.Label>Legg til:</Form.Label>
          <Table striped bordered hover size="sm" xs={6}>
            <thead>
            <tr>
              <th>Utstyr</th>
              <th>+</th>
            </tr>
            </thead>
            <tbody>
            {this.plussUtstyr.map(utstyr => (
                <tr key={utstyr.type}>
                  <td>{utstyr.type}</td>
                  <td>
                    <Button onClick={e => (this.type = e.target.value) && this.leggTilUtstyr(e)}>
                      +
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            </div>
          </Row>
        </ListGroup.Item>
      </React.Fragment>
    ];
  }
  mounted() {
    s_typer.alleSykkelTyper(typerSykler => {
      this.typerSykler = typerSykler;
      document.getElementById('s_type').value = this.typerSykler[0].type;
    });
  }
  kjør() {
    this.passendeUtstyr();
    this.upassendeUtstyr();
  }
  passendeUtstyr() {
    s_hent.hentPassendeUtstyr(this.type, this.type, this.s_type, minusUtstyr => {
      this.minusUtstyr = minusUtstyr;
    });
    setTimeout(() => {}, 250);
    console.log(this.minusUtstyr);
  }
  upassendeUtstyr() {
    s_hent.hentUpassendeUtstyr(this.type, this.u_type, this.s_type, this.kategori, plussUtstyr => {
      this.plussUtstyr = plussUtstyr;
    });
    setTimeout(() => {}, 250);
    console.log(this.plussUtstyr);
  }
  fjernUtstyr() {
    this.minusUtstyr.push(this.type);
    s_slett.fjernPassendeUtstyr(this.props.match.params.type, type, () => {
      s_hent.hentPassendeUtstyr(this.props.match.params.type, utstyr => {
        this.minusUtstyr = minusUtstyr;
      });
    });
  }
  leggTilUtstyr() {
    this.plussUtstyr.push(this.type);
    s_slett.LeggTilPassendeUtstyr(this.props.match.params.type, type, () => {
      s_hent.hentUpassendeUtstyr(this.props.match.params.type, utstyr => {
        this.plussUtstyr = plussUtstyr;
      });
    });
  }
}
