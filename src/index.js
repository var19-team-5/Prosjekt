import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

import { Menu } from './Innhold/meny';

import { Info } from './Innhold/info';
import { Hjelp } from './Innhold/hjelp';

import { Bestilling } from './Innhold/Bestilling/nav';
import { BestillingNy } from './Innhold/Bestilling/ny';
import { BestillingListe } from './Innhold/Bestilling/liste';

import { Status } from './Innhold/Status/nav';
import { StatusVarer } from './Innhold/Status/varer';
import { StatusSykler } from './Innhold/Status/sykler';
import { StatusUtstyr } from './Innhold/Status/utstyr';
import { Sok } from './Innhold/Status/sok';
import { StatusStatus } from './Innhold/Status/status';
import { StatusSyklerType } from './Innhold/Status/sykkeltype';
import { StatusUtstyrType } from './Innhold/Status/utstyrstype';

import { Ny } from './Innhold/Ny/nav';
import { Sykkel } from './Innhold/Ny/sykkel';
import { Utstyr } from './Innhold/Ny/utstyr';
import { Lokasjon } from './Innhold/Ny/lokasjon';
import { Restriksjon } from './Innhold/Ny/restriksjon';
import { Pris } from './Innhold/Ny/pris';

import { Oversikt } from './Innhold/Oversikt/nav';
import { Salg } from './Innhold/Oversikt/salg';

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />

      <Route exact path="/" component={Bestilling} />
      <Route exact path="/" component={BestillingNy} />

      <Route path="/bestilling" component={Bestilling} />
      <Route exact path="/bestilling/ny" component={BestillingNy} />
      <Route exact path="/bestilling/liste" component={BestillingListe} />

      <Route path="/status" component={Status} />
      <Route exact path="/status/alle" component={StatusVarer} />
      <Route exact path="/status/alle:v_id" component={Sok} />

      <Route path="/status/sykler" component={StatusSykler} />
      <Route exact path="/status/sykler:type" component={StatusSyklerType} />

      <Route path="/status/utstyr" component={StatusUtstyr} />
      <Route exact path="/status/utstyr:type" component={StatusUtstyrType} />

      <Route exact path="/status/statuser:status" component={StatusStatus} />

      <Route path="/ny" component={Ny} />
      <Route exact path="/ny/sykkel" component={Sykkel} />
      <Route exact path="/ny/utstyr" component={Utstyr} />
      <Route exact path="/ny/lokasjon" component={Lokasjon} />
      <Route exact path="/ny/restriksjon" component={Restriksjon} />
      <Route exact path="/ny/pris" component={Pris} />

      <Route path="/oversikt" component={Oversikt} />
      <Route exact path="/oversikt/salg" component={Salg} />

      <Route exact path="/info" component={Info} />
      <Route exact path="/hjelp" component={Hjelp} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
