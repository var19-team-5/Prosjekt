import { connection } from './../../mysql_connection';

class s_Salg {
  antallBestillinger(success) {
    connection.query(
      'SELECT COUNT(b_id) AS salg FROM bestilling',
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  sumBestillinger(success) {
    connection.query(
      'SELECT SUM(pris) AS sum FROM bestilling',
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallKunder(success) {
    connection.query(
      'SELECT COUNT(k_id) AS kunder FROM kunde',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallSykler(success) {
    connection.query(
      'SELECT COUNT(v_id) AS sykler FROM sykkel',
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallVarer(success) {
    connection.query(
      'SELECT COUNT(v_id) AS varer FROM vare',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  antallPåLager(success) {
    connection.query(
      'SELECT COUNT(v_id) AS lager FROM vare WHERE status = "på lager"',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallSavnet(success) {
    connection.query(
      'SELECT COUNT(v_id) AS savnet FROM vare AS savnet WHERE status = "savnet"',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  trengerReparasjon(success) {
    connection.query(
      'SELECT COUNT(v_id) AS trengerrep FROM vare WHERE status = "trenger reparasjon"',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallPåReparasjon(success) {
    connection.query(
      'SELECT COUNT(v_id) AS pårep FROM vare WHERE status = "på reparasjon"',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  antallTransporteres(success) {
    connection.query(
      'SELECT COUNT(v_id) AS transp FROM vare WHERE status = "transporteres"',
      (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_salg = new s_Salg();
