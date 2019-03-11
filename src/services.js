import { connection } from './mysql_connection';

class BestillingService {
  hentKunder(success) {
    connection.query('select * from kunde', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class StatusService {}

export let bestillingService = new BestillingService();
export let statusService = new StatusService();
