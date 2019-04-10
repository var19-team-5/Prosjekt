// Henter koblingen mot databasen
import { connection } from './mysql_connection';

// Klasse som inneholder metodene som blir brukt for å hente ut forskjellig informasjon
class s_Steder {
  // Henter ut de forskjellige stedene som er i databasen
  Steder(success) {
    connection.query('select * from lokasjon ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt for å hente ut forskjellig informasjon
class s_Typer {
  // Henter ut de forskjellige sykkeltypene som er i bruk
  SyklerTyper(success) {
    connection.query('SELECT DISTINCT type FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut de forskjellige utstyrstypene som er i bruk
  UtstyrTyper(success) {
    connection.query('SELECT DISTINCT type FROM utstyr ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut alle de forskjellige sykkeltypene som er i prislisten
  AlleSykkelTyper(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="sykkel"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Henter ut alle de forskjellige utstyrstypene som er i prislisten
  AlleUtstyrTyper(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="utstyr"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_steder = new s_Steder();
export let s_typer = new s_Typer();
