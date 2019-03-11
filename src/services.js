import { connection } from './mysql_connection';

class BestillingService {
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
    connection.query('SELECT * from sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyr(success) {
    connection.query('SELECT * from utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingService = new BestillingService();
export let statusService = new StatusService();
