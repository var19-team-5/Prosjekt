import { connection } from './mysql_connection';

class s_Hent {
  Steder(success) {
    connection.query('select * from lokasjon ', (error, results) => {
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
  AlleSykkelTyper(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="sykkel"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  AlleUtstyrTyper(success) {
    connection.query('SELECT * FROM prisliste WHERE kategori="utstyr"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_hent = new s_Hent();
export let s_typer = new s_Typer();
