import { connection } from './mysql_connection';

class NyService {}

class NyBestillingService {
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
  leggTilKunde(navn, email, mobilnummer, success) {
    connection.query(
      'insert into kunde (navn, email, mobilnummer) values (?, ?, ?)',
      [navn, email, mobilnummer],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  leggTilBestilling(fra, til, henting, levering, success) {
    connection.query(
      'insert into bestilling (fra, til, henting, levering) values (?, ?, ?, ?)',
      [fra, til, henting, levering],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

class ListeBestillingService {
  hentBestillinger(success) {
    connection.query('select * from bestilling', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class StatusService {
  hentVarerSøk(v_id, success) {
    connection.query(
      'SELECT * FROM vare INNER JOIN prisliste on vare.type = prisliste.type where vare.v_id=?',
      [v_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentVarer(success) {
    connection.query('SELECT * FROM alle_varer ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentSykler(success) {
    connection.query(
      'SELECT * FROM sykkel INNER JOIN prisliste on sykkel.type = prisliste.type ORDER BY sykkel.type, sykkel.ramme',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentUtstyr(success) {
    connection.query(
      'SELECT * FROM utstyr INNER JOIN prisliste on utstyr.type = prisliste.type ORDER BY utstyr.type',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  hentStatuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  hentVarerStatus(status, success) {
    connection.query(
      'SELECT * FROM vare INNER JOIN prisliste on vare.type = prisliste.type INNER JOIN lokasjon on vare.lokasjon = lokasjon.l_id where status=? ORDER BY vare.type',
      [status],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

class TypeStatusService {
  hentSyklerType(type, success) {
    connection.query(
      'SELECT * FROM sykkel INNER JOIN prisliste on sykkel.type = prisliste.type where sykkel.type=?',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentUtstyrType(type, success) {
    connection.query(
      'SELECT * FROM utstyr INNER JOIN prisliste on utstyr.type = prisliste.type where utstyr.type=? ',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  hentSyklerTyper(success) {
    connection.query('SELECT DISTINCT type FROM sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyrTyper(success) {
    connection.query('SELECT DISTINCT type FROM utstyr ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let nyBestillingService = new NyBestillingService();
export let listeBestillingService = new ListeBestillingService();

export let statusService = new StatusService();
export let typeStatusService = new TypeStatusService();

export let nyService = new NyService();
