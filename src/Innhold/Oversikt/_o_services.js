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
  // Teller hvor mange sykler det er i databasen
  AntallSykler(success) {
    connection.query('SELECT COUNT(v_id) AS sykler FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Teller hvor mange sykler som har status på reperasjon i databasen
  AntallSyklerRep(success) {
    connection.query(
      'SELECT COUNT(sykkel.v_id) AS srep FROM sykkel INNER JOIN vare ON sykkel.v_id = vare.v_id WHERE status = "på reparasjon"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
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
