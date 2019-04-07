import { connection } from './../../mysql_connection';

class s_Salg {
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

  sumBestillinger(success) {
    connection.query('SELECT SUM(pris) AS sum FROM bestilling', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_salg = new s_Salg();
