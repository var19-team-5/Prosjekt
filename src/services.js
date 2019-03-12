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
    connection.query('SELECT * FROM vare INNER JOIN prisliste on vare.type = prisliste.type', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentSykler(success) {
    connection.query('SELECT * FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyr(success) {
    connection.query('SELECT * FROM utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingService = new BestillingService();
export let statusService = new StatusService();
