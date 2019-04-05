import { connection } from './mysql_connection';

class s_Ny {
  Restriksjon(s_type, u_type) {
    connection.query('INSERT INTO restriksjoner (s_type, u_type) VALUES (?,?)', [s_type, u_type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Lokasjon(lokasjon, success) {
    connection.query('insert into lokasjon (lokasjon) values (?)', [lokasjon], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  Utstyr(tilhører, type, success) {
    connection.query(
      'INSERT INTO vare (tilhører, status, lokasjon, type) VALUES ((SELECT l_id FROM lokasjon WHERE lokasjon=?), "på lager", (SELECT l_id FROM lokasjon WHERE lokasjon=?), ?)',
      [tilhører, tilhører, type],
      (error, results) => {
        connection.query(
          'INSERT INTO utstyr (v_id, type) VALUES ((SELECT MAX(v_id) FROM vare),?)',
          [type],
          (error, results) => {
            if (error) return console.error(error);

            success(results);
          }
        );
      }
    );
  }
  Sykkel(tilhører, type, ramme, girsystem, størrelse_hjul, success) {
    connection.query(
      'INSERT INTO vare (tilhører, status, lokasjon, type) VALUES ((SELECT l_id FROM lokasjon WHERE lokasjon=?), "på lager", (SELECT l_id FROM lokasjon WHERE lokasjon=?), ?)',
      [tilhører, tilhører, type],
      (error, results) => {
        connection.query(
          'INSERT INTO sykkel (v_id, ramme, girsystem, størrelse_hjul, type) VALUES ((SELECT MAX(v_id) FROM vare),?,?,?,?)',
          [ramme, girsystem, størrelse_hjul, type],
          (error, results) => {
            if (error) return console.error(error);

            success(results);
          }
        );
      }
    );
  }
  Bestilling(fra, til, henting, levering, mobilnummer, rabatt, totalSum, success) {
    connection.query(
      'insert into bestilling (fra, til, henting, levering, k_id, rabatt, status, pris) values (?,?,(SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT k_id FROM kunde WHERE mobilnummer=?),?,"bestilt",?)',
      [fra, til, henting, levering, mobilnummer, rabatt, totalSum],
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
  TypeSykkel(nytype, nypris, success) {
    connection.query(
      'INSERT INTO prisliste (type, pris, kategori) VALUES (?,?,"sykkel")',
      [nytype, nypris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  TypeUtstyr(nytype, nypris, success) {
    connection.query(
      'INSERT INTO prisliste (type, pris, kategori) VALUES (?,?,"utstyr")',
      [nytype, nypris],
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
    connection.query('select * from lokasjon WHERE NOT lokasjon = "Ukjent"', (error, results) => {
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

  Varer(success) {
    connection.query('SELECT * FROM alle_varer', (error, results) => {
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
  hentUpassendeUtstyr(type, u_type, s_type, kategori, success) {
    connection.query(
      'SELECT prisliste.type FROM prisliste LEFT JOIN restriksjoner ON prisliste.type = restriksjoner.u_type WHERE (restriksjoner.s_type != ? OR restriksjoner.u_type IS NULL) AND prisliste.kategori = "utstyr" ',
      [type, u_type, s_type, kategori],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentPassendeUtstyr(u_type, type, s_type, success) {
    connection.query(
      'SELECT prisliste.type FROM restriksjoner INNER JOIN prisliste ON restriksjoner.u_type = prisliste.type WHERE s_type =? ',
      [u_type, type, s_type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
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
  Bestilling(navn, success) {
    connection.query('SELECT * FROM alle_bestillinger WHERE navn LIKE ?', ['%' + navn + '%'], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SpesBestilling(b_id, success) {
    connection.query('select * from alle_bestillinger where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SpesBestillingVarer(b_id, success) {
    connection.query('select * from bestillinger_varer where b_id=?', [b_id], (error, results) => {
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

  LedigeSyklerType(fra, til, type, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, ramme, girsystem, størrelse_hjul, status, pris FROM tilgjengelige_sykler WHERE (NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)) AND type = ? ORDER BY v_id ASC',
      [fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  LedigeUtstyrType(fra, til, type, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, status, pris FROM tilgjengelige_utstyr WHERE (NOT (fra <= ? OR  til <= ?) OR NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)) AND type = ? ORDER BY v_id ASC',
      [fra, til, fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  antallBestillinger(success) {
    connection.query('SELECT COUNT(b_id) AS salg FROM bestilling', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallKunder(success) {
    connection.query('SELECT COUNT(k_id) AS kunder FROM kunde', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallSykler(success) {
    connection.query('SELECT COUNT(v_id) AS sykler FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallSyklerRep(success) {
    connection.query(
      'SELECT COUNT(sykkel.v_id) AS srep FROM sykkel INNER JOIN vare ON sykkel.v_id = vare.v_id WHERE status = "reparasjon"',
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
  sumBestillinger(success) {
    connection.query('SELECT SUM(pris) AS sum FROM bestilling', (error, results) => {
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
  Statuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
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
    connection.query('update bestilling set status ="under transport" where b_id=?', [b_id], (error, results) => {
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
    connection.query('update vare set status ="er på reperasjon" where v_id=?', [v_id], (error, results) => {
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

  fjernPassendeUtstyr(s_type, u_type, success) {
    connection.query(
      'DELETE FROM restriksjoner WHERE s_type=? and u_type=?',
      [s_type, u_type],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  LeggTilPassendeUtstyr(success) {
    connection.query(
      'INSERT INTO restriksjoner (s_type, u_type) values (?, ?)',
      [s_type, u_type],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let s_ny = new s_Ny();
export let s_hent = new s_Hent();
export let s_typer = new s_Typer();
export let s_sok = new s_Sok();
export let s_endre = new s_Endre();
export let s_slett = new s_Slett();
