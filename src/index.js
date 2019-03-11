import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService, statusService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

class Menu extends Component {
  render() {
    return (
      <NavBar brand="SUSU v1">
        <NavBar.Link activeStyle={{ color: 'pink' }} to="/bestilling">
          Bestilling
        </NavBar.Link>

        <NavBar.Link activeStyle={{ color: 'pink' }} to="/status">
          Status
        </NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Card title="Welcome">
        Til SUSU v1.1!
        <br />
        Dette er verdens beste informasjonssystem for utleie av sykler og utstyr.
        <br />
        <br />
        Versjon 1.1 inneholder:
        <br />
        Bestillingsside med kundeinformasjon, dato for utleie og levering/hentested
      </Card>
    );
  }
}

class BestillingNew extends Component {
  navn = '';
  email = '';
  mobilnummer = '';

  til = '';
  fra = '';

  hentested = '';
  leveringssted = '';

  render() {
    return (
      <div>
        <Card title="Kundeinformasjon:">
          <ul className="list-group">
            <li className="list-group-item">
              <Form.Label> Navn: </Form.Label>
              <Form.Input type="text" value={this.navn} onChange={e => (this.navn = e.target.value)} />
            </li>
            <li className="list-group-item">
              <Form.Label> Email: </Form.Label>
              <Form.Input type="text" value={this.email} onChange={e => (this.email = e.target.value)} />
            </li>
            <li className="list-group-item">
              <Form.Label> Mobilnummer: </Form.Label>
              <Form.Input type="text" value={this.mobilnummer} onChange={e => (this.mobilnummer = e.target.value)} />
            </li>
          </ul>
        </Card>
        <Card title="Utleie:">
          <ul className="list-group">
            <li className="list-group-item">
              <Form.Label> Fra: </Form.Label>
              <Form.Input type="text" value={this.fra} onChange={e => (this.fra = e.target.value)} />
            </li>
            <li className="list-group-item">
              <Form.Label> Til: </Form.Label>
              <Form.Input type="text" value={this.til} onChange={e => (this.til = e.target.value)} />
            </li>
          </ul>
        </Card>
        <Card title="Sted:">
          <ul className="list-group">
            <li className="list-group-item">
              <Form.Label> Hentested: </Form.Label>
              <Form.Input type="text" value={this.lokasjon} onChange={e => (this.lokasjon = e.target.value)} />
            </li>
            <li className="list-group-item">
              <Form.Label> Leveringssted: </Form.Label>
              <Form.Input type="text" value={this.lokasjon} onChange={e => (this.lokasjon = e.target.value)} />
            </li>
          </ul>
        </Card>
      </div>
    );
  }
}

class Status extends Component {
  navn = '';
  email = '';
  mobilnummer = '';

  render() {
    return (
      <div />
      // <Card title="Velg Mobilnummer">
      //   {this.allStudents
      //     .filter(allStudent => this.students.every(student => allStudent.id != student.id))
      //     .map(student => (
      //       <Row key={student.id}>
      //         <Column>{student.name}</Column>
      //         <Column width={2}>
      //           <Button.Success small onClick={() => this.addStudent(student.id)}>
      //             +
      //           </Button.Success>
      //         </Column>
      //       </Row>
      //     ))}
      // </Card>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />

      <Route exact path="/bestilling" component={BestillingNew} />
      <Route exact path="/status" component={Status} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
