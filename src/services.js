import { connection } from './mysql_connection';

class s_Ny {
  Bestilling(fra, til, henting, levering, mobilnummer, rabatt, totalSum, success) {
    connection.query(
      'insert into bestilling (fra, til, henting, levering, k_id, rabatt, status) values (?,?,(SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT k_id FROM kunde WHERE mobilnummer=?),"35","bestilt")',
      [fra, til, henting, levering, mobilnummer],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  Kunde(navn, email, mobilnummer, success) {
    connection.query(
      'insert into kunde (navn, email, mobilnummer) values (?, ?, ?)',
      [navn, email, mobilnummer],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  Vareliste(v_id) {
    connection.query(
      'INSERT INTO utleieliste (v_id, b_id) VALUES (?,(SELECT MAX(b_id) FROM bestilling))',
      [v_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

class s_Hent {
  Steder(success) {
    connection.query('select * from lokasjon', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Bestillinger(success) {
    connection.query('select * from alle_bestillinger', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Sykler(success) {
    connection.query('SELECT * FROM alle_sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Utstyr(success) {
    connection.query('SELECT * FROM alt_utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  typeSykkel(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="sykkel"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  typeUtstyr(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="utstyr"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  restriksjonerTyper(type, success) {
    connection.query('SELECT u_type AS type FROM restriksjoner WHERE s_type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  KundeAntall(mobilnummer, success) {
    connection.query(
      'SELECT antall_b AS antall FROM antall_kundebestillinger WHERE mobilnummer=?',
      [mobilnummer],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  priser(success) {
    connection.query('SELECT * from prisliste', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Sok {
  Kunde(mobilnummer, success) {
    connection.query('select * from kunde where mobilnummer=?', [mobilnummer], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Vare(v_id, success) {
    connection.query('SELECT * FROM alle_varer WHERE alle_varer.v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SyklerType(type, success) {
    connection.query('SELECT * FROM alle_sykler WHERE alle_sykler.type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  UtstyrType(type, success) {
    connection.query('SELECT * FROM alt_utstyr WHERE alt_utstyr.type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  VarerStatus(status, success) {
    connection.query('SELECT * FROM alle_varer WHERE status=?', [status], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  LedigeSykler(fra, til, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, ramme, girsystem, størrelse_hjul, status, pris FROM tilgjengelige_sykler WHERE NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)',
      [fra, til],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  LedigeSyklerType(fra, til, type, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, ramme, girsystem, størrelse_hjul, status, pris FROM tilgjengelige_sykler WHERE NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL) AND type = ?',
      [fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  LedigeUtstyr(fra, til, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, status, pris FROM tilgjengelige_utstyr WHERE NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)',
      [fra, til],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  infoVarer(v_id, success) {
    connection.query('SELECT v_id, type, pris FROM alle_varer WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Typer {
  SyklerTyper(success) {
    connection.query('SELECT DISTINCT type FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  UtstyrTyper(success) {
    connection.query('SELECT DISTINCT type FROM utstyr ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  alleSykkelTyper(success) {
    connection.query('SELECT type FROM prisliste WHERE kategori="sykkel"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  alleUtstyrTyper(success) {
    connection.query('SELECT type FROM prisliste WHERE kategori="utstyr"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Endre {
  BestiltVare(v_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  UtlevertVare(v_id, success) {
    connection.query('update vare set status ="utleid" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  FerdigVare(v_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  TransportVare(v_id, success) {
    connection.query('update vare set status ="transporteres" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  SavnetVare(v_id, success) {
    connection.query('update vare set status ="savnet" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  BestiltBest(b_id, success) {
    connection.query('update bestilling set status ="bestilt" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  UtlevertBest(b_id, success) {
    connection.query('update bestilling set status ="levert ut" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  FerdigBest(b_id, success) {
    connection.query('update bestilling set status ="ferdig" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  TransportBest(b_id, success) {
    connection.query('update bestilling set status ="transporteres" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SavnetBest(b_id, success) {
    connection.query('update bestilling set status ="savnet" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Lager(v_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  trengerRep(v_id, success) {
    connection.query('update vare set status ="trenger reperasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Rep(v_id, success) {
    connection.query('update vare set status ="på reperasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  savnet(v_id, success) {
    connection.query('update vare set status ="savnet" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Slett {
  BestillingVarer(b_id, success) {
    connection.query('delete from utleieliste where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Bestilling(b_id, success) {
    connection.query('delete from bestilling where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Vare(v_id, success) {
    connection.query('delete from sykkel where v_id=?', [v_id], (error, results) => {
      connection.query('delete from vare where v_id=?', [v_id], (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
    });
  }
}

export let s_ny = new s_Ny();
export let s_hent = new s_Hent();
export let s_typer = new s_Typer();
export let s_sok = new s_Sok();
