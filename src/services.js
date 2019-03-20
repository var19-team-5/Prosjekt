import { connection } from './mysql_connection';

class s_Ny {
  Restriksjon(s_type, u_type) {
    connection.query('insert into lokasjon (s_type, u_type) values (?,?)', [s_type, u_type], (error, results) => {
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
  Bestilling(fra, til, henting, levering, mobilnummer, success) {
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
      'SELECT * FROM vare LEFT JOIN utleieliste ON utleieliste.v_id = vare.v_id LEFT JOIN bestilling ON bestilling.b_id = utleieliste.b_id LEFT JOIN sykkel ON sykkel.v_id = vare.v_id WHERE ((bestilling.fra NOT BETWEEN ? AND ?) OR (bestilling.fra IS NULL) ) AND sykkel.v_id IS NOT NULL OR ((bestilling.til NOT BETWEEN ? AND ?) OR( bestilling.til IS NULL)) AND sykkel.v_id IS NOT NULL ORDER BY `sykkel`.`v_id`  ASC',
      [fra, til, fra, til],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  LedigeSyklerType(fra, til, type, success) {
    connection.query(
      'SELECT * FROM vare LEFT JOIN utleieliste ON utleieliste.v_id = vare.v_id LEFT JOIN bestilling ON bestilling.b_id = utleieliste.b_id LEFT JOIN sykkel ON sykkel.v_id = vare.v_id WHERE ((bestilling.fra NOT BETWEEN ? AND ?) OR (bestilling.fra IS NULL) ) AND sykkel.v_id IS NOT NULL AND sykkel.type=? OR ((bestilling.til NOT BETWEEN ? AND ?) OR( bestilling.til IS NULL)) AND sykkel.v_id IS NOT NULL AND sykkel.type=? ORDER BY `sykkel`.`v_id`  ASC',
      [fra, til, type, fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  LedigeUtstyr(fra, til, success) {
    connection.query(
      'SELECT * FROM vare LEFT JOIN utleieliste ON utleieliste.v_id = vare.v_id LEFT JOIN bestilling ON bestilling.b_id = utleieliste.b_id LEFT JOIN utstyr ON utstyr.v_id = vare.v_id WHERE ((bestilling.fra NOT BETWEEN ? AND ?) OR (bestilling.fra IS NULL) ) AND utstyr.v_id IS NOT NULL OR ((bestilling.til NOT BETWEEN ? AND ?) OR( bestilling.til IS NULL)) AND utstyr.v_id IS NOT NULL ORDER BY utstyr.`v_id`  ASC',
      [fra, til, fra, til],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  LedigeUtstyrType(fra, til, type, success) {
    connection.query(
      'SELECT * FROM vare LEFT JOIN utleieliste ON utleieliste.v_id = vare.v_id LEFT JOIN bestilling ON bestilling.b_id = utleieliste.b_id LEFT JOIN utstyr ON utstyr.v_id = vare.v_id WHERE ((bestilling.fra NOT BETWEEN ? AND ?) OR (bestilling.fra IS NULL) ) AND utstyr.v_id IS NOT NULL AND utstyr.type=? OR ((bestilling.til NOT BETWEEN ? AND ?) OR( bestilling.til IS NULL)) AND utstyr.v_id IS NOT NULL AND utstyr.type=? ORDER BY utstyr.`v_id`  ASC',
      [fra, til, type, fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
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

export let s_ny = new s_Ny();
export let s_hent = new s_Hent();
export let s_typer = new s_Typer();
export let s_sok = new s_Sok();
