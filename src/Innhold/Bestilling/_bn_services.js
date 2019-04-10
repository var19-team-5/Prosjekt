// Henter koblingen mot databasen
import { connection } from './../../mysql_connection';

// Klasse som inneholder metodene som blir brukt mot databasen som har med å legge inn en nye ting
class s_Ny {
  // Bruker fra dato, til dato, hentested, leveringssted, kroner rabatt og totalsummen for å legge inn en ny bestilling i systemet. Henter også ut lokasjons id'en fra databasen ved å søke opp lokasjonen
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
  // Bruker navn, email og mobilnummer for å opprette en ny kunde
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
  // Bruker v_id'en for å legge inn varen i utleielisten. Henter også ut den siste bestillings id'en som ble opprettet rett før
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

// Klasse som inneholder metodene som blir brukt mot databasen som blir brukt til søk
class s_Sok {
  // Bruker mobilnummeret til å søke opp resten av informasjonen om kunden
  Kunde(mobilnummer, success) {
    connection.query('select * from kunde where mobilnummer=?', [mobilnummer], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen som blir brukt for å hente ut informasjon
class s_Info {
  // Bruker mobilnummer til å hente ut hvor mange bestillinger en kunde har fra før i systemet
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
  // Bruker v_id'en til å hente ut mer informasjon om varen
  Varer(v_id, success) {
    connection.query('SELECT v_id, type, pris FROM alle_varer WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for å finne ut hva som er ledig
class s_Ledige {
  // Bruker fra dato, til dato og type for å finne ut hvilke sykler som er ledige i tidspunktet
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
    // Bruker fra dato, til dato og type for å finne ut hvilket utstyr som er ledige i tidspunktet
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

// Klasse som inneholder metodene som blir brukt mot databasen for å hente ut restriksjoner
class s_Restriksjon {
  // Bruker typen for å hente ut hvilke utstyrstyper som passer
  HentPassendeUtstyr(type, success) {
    connection.query(
      'SELECT type FROM restriksjoner INNER JOIN prisliste ON restriksjoner.u_type = prisliste.type WHERE s_type=?',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

// Eksporterer de forskjellige klassene
export let s_ny = new s_Ny();
export let s_info = new s_Info();
export let s_sok = new s_Sok();
export let s_ledige = new s_Ledige();
export let s_restriksjon = new s_Restriksjon();
