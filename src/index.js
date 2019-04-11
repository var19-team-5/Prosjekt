import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

import { Meny } from './Innhold/meny';

import { Info } from './Innhold/info';

import { Hjelp } from './Innhold/Hjelp/nav';
import { Bestille } from './Innhold/Hjelp/bestille';
import { HNy } from './Innhold/Hjelp/ny';

import { Bestilling } from './Innhold/Bestilling/nav';
import { BNy } from './Innhold/Bestilling/ny';
import { Liste } from './Innhold/Bestilling/liste';

import { Status } from './Innhold/Status/nav';
import { Varer } from './Innhold/Status/varer';
import { SSykler } from './Innhold/Status/sykler';
import { SUtstyr } from './Innhold/Status/utstyr';
import { Sok } from './Innhold/Status/sok';
import { SStatus } from './Innhold/Status/status';
import { SyklerType } from './Innhold/Status/sykkeltype';
import { UtstyrType } from './Innhold/Status/utstyrstype';

import { Ny } from './Innhold/Ny/nav';
import { Sykkel } from './Innhold/Ny/sykkel';
import { Utstyr } from './Innhold/Ny/utstyr';
import { Lokasjon } from './Innhold/Ny/lokasjon';
import { Restriksjon } from './Innhold/Ny/restriksjon';
import { Pris } from './Innhold/Ny/pris';

import { Oversikt } from './Innhold/Oversikt/nav';
import { Statistikk } from './Innhold/Oversikt/statistikk';
import { Statusvarer } from './Innhold/Oversikt/statusvarer';

ReactDOM.render(
  <HashRouter>
    <div>
      <Meny />

      <Route exact path="/" component={Bestilling} />
      <Route exact path="/" component={BNy} />

      <Route path="/bestilling" component={Bestilling} />
      <Route exact path="/bestilling/ny" component={BNy} />
      <Route exact path="/bestilling/liste" component={Liste} />

      <Route path="/status" component={Status} />
      <Route exact path="/status/alle" component={Varer} />
      <Route exact path="/status/alle:v_id" component={Sok} />

      <Route path="/status/sykler" component={SSykler} />
      <Route exact path="/status/sykler:type" component={SyklerType} />

      <Route path="/status/utstyr" component={SUtstyr} />
      <Route exact path="/status/utstyr:type" component={UtstyrType} />

      <Route exact path="/status/statuser:status" component={SStatus} />

      <Route path="/ny" component={Ny} />
      <Route exact path="/ny/sykkel" component={Sykkel} />
      <Route exact path="/ny/utstyr" component={Utstyr} />
      <Route exact path="/ny/lokasjon" component={Lokasjon} />
      <Route exact path="/ny/restriksjon" component={Restriksjon} />
      <Route exact path="/ny/pris" component={Pris} />

      <Route path="/oversikt" component={Oversikt} />
      <Route exact path="/oversikt/statistikk" component={Statistikk} />
      <Route exact path="/oversikt/statusvarer" component={Statusvarer} />

      <Route path="/info" component={Info} />
      <Route path="/hjelp" component={Hjelp} />
      <Route exact path="/hjelp/hjelp_bestille" component={Bestille} />
      <Route exact path="/hjelp/hjelp_ny" component={HNy} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
