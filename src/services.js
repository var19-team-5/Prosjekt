import { connection } from './mysql_connection';

class BestillingService {
  hentSteder(success) {
    connection.query('select * from lokasjon', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentKunder(success) {
    connection.query('select * from kunde', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class StatusService {
  hentVarer(success) {
    connection.query(
      'SELECT * FROM vare INNER JOIN prisliste on vare.type = prisliste.type INNER JOIN lokasjon on vare.lokasjon = lokasjon.l_id ',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSykler(success) {
    connection.query('SELECT * FROM sykkel INNER JOIN prisliste on sykkel.type = prisliste.type', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyr(success) {
    connection.query('SELECT * FROM utstyr INNER JOIN prisliste on utstyr.type = prisliste.type ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentSyklerTyper(success) {
    connection.query('SELECT * FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyrTyper(success) {
    connection.query('SELECT * FROM utstyr ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentStatuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentSyklerType(type, success) {
    connection.query('SELECT * FROM sykkel where type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyrType(type, success) {
    connection.query('SELECT * FROM utstyr where type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentVarerStatus(status, success) {
    connection.query(
      'SELECT * FROM vare INNER JOIN prisliste on vare.type = prisliste.type INNER JOIN lokasjon on vare.lokasjon = lokasjon.l_id where status=? ',
      [status],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let bestillingService = new BestillingService();
export let statusService = new StatusService();
