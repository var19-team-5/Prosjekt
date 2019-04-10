// Henter koblingen mot databasen
import { connection } from './../../mysql_connection';

// Klasse som inneholder metodene som blir brukt mot databasen for siden ny salg
class s_Salg {
  // Teller hvor mange bestillinger det er i databasen
  AntallBestillinger(success) {
    connection.query('SELECT COUNT(b_id) AS salg FROM bestilling', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange kunder det er i databasen
  AntallKunder(success) {
    connection.query('SELECT COUNT(k_id) AS kunder FROM kunde', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange varer det er i databasen
  AntallVarer(success) {
    connection.query('SELECT COUNT(v_id) AS varer FROM vare', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange sykler det er i databasen
  AntallSykler(success) {
    connection.query('SELECT COUNT(v_id) AS sykler FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange varer som har status "på lager" i databasen
  AntallPåLager(success) {
    connection.query('SELECT COUNT(v_id) AS lager FROM vare WHERE status = "på lager"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange varer som har status "savnet" i databasen
  AntallSavnet(success) {
    connection.query('SELECT COUNT(v_id) AS savnet FROM vare AS savnet WHERE status = "savnet"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange varer som har status "trenger reperasjon" i databasen
  AntallTrengerReparasjon(success) {
    connection.query(
      'SELECT COUNT(v_id) AS trengerrep FROM vare WHERE status = "trenger reparasjon"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Teller hvor mange varer som har status "på reperasjon" i databasen
  AntallPåReparasjon(success) {
    connection.query('SELECT COUNT(v_id) AS pårep FROM vare WHERE status = "på reparasjon"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange varer som har status "transporteres" i databasen
  AntallTransporteres(success) {
    connection.query('SELECT COUNT(v_id) AS transp FROM vare WHERE status = "transporteres"', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Summerer hvor stor sum totalt det er med alle sumBestillingene
  SumBestillinger(success) {
    connection.query('SELECT SUM(pris) AS sum FROM bestilling', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Eksporterer klassen
export let s_salg = new s_Salg();
