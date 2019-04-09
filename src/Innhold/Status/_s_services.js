// Henter koblingen mot databasen
import { connection } from './../../mysql_connection';

// Klasse som inneholder metodene som blir brukt mot databasen for navigasjonsbaren
class s_Nav {
  // Henter ut de forskjellige statusene som blir brukt for å kunne filtrere på status
  BrukteStatuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for søkebaren
class s_Sok {
  // Bruker vare_id'en for å hente ut all informasjon om varen
  Vare(v_id, success) {
    connection.query('SELECT * FROM alle_varer WHERE alle_varer.v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for siden
class s_Status {
  // Bruker statusen til å hente ut alle varene med samme status
  VarerStatus(status, success) {
    connection.query('SELECT * FROM alle_varer WHERE status=?', [status], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut v_id'en og setter statusen på varen til "på lager"
  PåLager(v_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut v_id'en og setter statusen på varen til "trenger reparasjon"
  TrengerReparasjon(v_id, success) {
    connection.query('update vare set status ="trenger reparasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut v_id'en og setter statusen på varen til "på reparasjon"
  PåReparasjon(v_id, success) {
    connection.query('update vare set status ="på reparasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut v_id'en og setter statusen på varen til "savnet"
  Savnet(v_id, success) {
    connection.query('update vare set status ="savnet" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt til sletting
class s_Slett {
  // Henter ut v_id'en og sletter vare fra sykkel, utstyr og vare
  Vare(v_id, success) {
    connection.query('delete from sykkel where v_id=?', [v_id], (error, results) => {
      connection.query('delete from utstyr where v_id=?', [v_id], (error, results) => {
        connection.query('delete from vare where v_id=?', [v_id], (error, results) => {
          if (error) return console.error(error);

          success(results);
        });
      });
    });
  }
}
// Klasse som inneholder metodene for varene
class s_Varer {
  // Henter ut alle de forskjellige varene
  AlleVarer(success) {
    connection.query('SELECT * FROM alle_varer', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
// Klasse som inneholder metodene som blir brukt mot databasen for siden med bare sykler
class s_Sykler {
  // Henter ut alle syklene fra databasen
  AlleSykler(success) {
    connection.query('SELECT * FROM alle_sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Bruker typen til å hente ut alle syklene med den typen
  SyklerType(type, success) {
    connection.query('SELECT * FROM alle_sykler WHERE alle_sykler.type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
// Klasse som inneholder metodene som blir brukt mot databasen for siden
class s_Utstyr {
  // Henter ut alt utstyret fra databasen
  AltUtstyr(success) {
    connection.query('SELECT * FROM alt_utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Bruker typen til å hente ut alt utstyret med den typen
  UtstyrType(type, success) {
    connection.query('SELECT * FROM alt_utstyr WHERE alt_utstyr.type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Eksporterer de forskjellige klassene
export let s_nav = new s_Nav();
export let s_sok = new s_Sok();
export let s_status = new s_Status();
export let s_slett = new s_Slett();
export let s_varer = new s_Varer();
export let s_sykler = new s_Sykler();
export let s_utstyr = new s_Utstyr();
