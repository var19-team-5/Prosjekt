import { connection } from './mysql_connection';

class BestillingService {
  hentKunder(mobilnummer, success) {
    connection.query('select * from Kunder where mobilnummer=?', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }
}

class StatusService {}

export let bestillingService = new BestillingService();
export let statusService = new StatusService();
