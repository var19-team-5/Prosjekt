import { connection } from './../../mysql_connection';

class s_Ny {
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
  Varer(v_id) {
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

class s_Sok {
  Kunde(mobilnummer, success) {
    connection.query('select * from kunde where mobilnummer=?', [mobilnummer], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
class s_Info {
  AntallBestillinger(mobilnummer, success) {
    connection.query(
      'SELECT antall_b AS antall FROM antall_kundebestillinger WHERE mobilnummer=?',
      [mobilnummer],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

class s_Ledige {
  Sykler(fra, til, type, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, ramme, girsystem, størrelse_hjul, status, pris FROM tilgjengelige_sykler WHERE (NOT (fra <= ? OR  til <= ?) OR NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)) AND type = ? ORDER BY v_id ASC',
      [fra, til, fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  Utstyr(fra, til, type, success) {
    connection.query(
      'SELECT DISTINCT v_id, type, status, pris FROM tilgjengelige_utstyr WHERE (NOT (fra <= ? OR  til <= ?) OR NOT (fra >= ? OR  til >= ?) OR (fra IS NULL OR til IS NULL)) AND type = ? ORDER BY v_id ASC',
      [fra, til, fra, til, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let s_ny = new s_Ny();
export let s_info = new s_Info();
export let s_sok = new s_Sok();
export let s_ledige = new s_Ledige();
