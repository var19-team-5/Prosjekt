import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

import { Menu } from './Innhold/meny';

import { Home } from './Innhold/hjem';

import { Info } from './Innhold/info';
import { Hjelp } from './Innhold/hjelp';

import { Bestilling } from './Innhold/Bestilling/nav';
import { BestillingNy } from './Innhold/Bestilling/ny';
import { BestillingListe } from './Innhold/Bestilling/liste';

import { Status } from './Innhold/Status/nav';
import { StatusVarer } from './Innhold/Status/varer';
import { StatusSykler } from './Innhold/Status/sykler';
import { StatusUtstyr } from './Innhold/Status/utstyr';
import { StatusSok } from './Innhold/Status/sok';
import { StatusStatus } from './Innhold/Status/status';
import { StatusSyklerType } from './Innhold/Status/sykkeltype';
import { StatusUtstyrType } from './Innhold/Status/utstyrstype';

import { Ny } from './Innhold/Ny/nav';
import { NySykkel } from './Innhold/Ny/sykkel';
import { NyUtstyr } from './Innhold/Ny/utstyr';
import { NyLokasjon } from './Innhold/Ny/lokasjon';
import { NyRestriksjon } from './Innhold/Ny/restriksjon';
import { NyPris } from './Innhold/Ny/nypris';

import { Oversikt } from './Innhold/Oversikt/nav';
import { SalgsOversikt } from './Innhold/Oversikt/soversikt';

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />

      <Route path="/bestilling" component={Bestilling} />
      <Route exact path="/bestilling/ny" component={BestillingNy} />
      <Route exact path="/bestilling/liste" component={BestillingListe} />

      <Route path="/status" component={Status} />
      <Route exact path="/status/alle" component={StatusVarer} />
      <Route exact path="/status/alle:v_id" component={StatusSok} />

      <Route path="/status/sykler" component={StatusSykler} />
      <Route exact path="/status/sykler:type" component={StatusSyklerType} />

      <Route path="/status/utstyr" component={StatusUtstyr} />
      <Route exact path="/status/utstyr:type" component={StatusUtstyrType} />

      <Route exact path="/status/statuser:status" component={StatusStatus} />

      <Route path="/ny" component={Ny} />
      <Route exact path="/ny/sykkel" component={NySykkel} />
      <Route exact path="/ny/utstyr" component={NyUtstyr} />
      <Route exact path="/ny/lokasjon" component={NyLokasjon} />
      <Route exact path="/ny/restriksjon" component={NyRestriksjon} />
      <Route exact path="/ny/nypris" component={NyPris} />

      <Route path="/oversikt" component={Oversikt} />
      <Route exact path="/oversikt/soversikt" component={SalgsOversikt} />

      <Route path="/info" component={Info} />
      <Route path="/hjelp" component={Hjelp} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
