import { connection } from './mysql_connection';

class NyService {
  nyLokasjon(lokasjon, success) {
    connection.query('insert into lokasjon (lokasjon) values (?)', [lokasjon], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  nyUtstyr(tilhører, lokasjon, type, success) {
    connection.query(
      'INSERT INTO vare (tilhører, status, lokasjon, type) VALUES ((SELECT l_id FROM lokasjon WHERE lokasjon=?), "på lager", (SELECT l_id FROM lokasjon WHERE lokasjon=?), ?)',
      [tilhører, lokasjon, type],
      (error, results) => {
        connection.query(
          'INSERT INTO utstyr (v_id, type) VALUES ((SELECT MAX(v_id) FROM vare),?)',
          [type],
          (error, results) => {
            if (error) return console.error(error);

            success(results);
          }
        );
      }
    );
  }

  nySykkel(tilhører, lokasjon, type, ramme, girsystem, størrelse_hjul, success) {
    connection.query(
      'INSERT INTO vare (tilhører, status, lokasjon, type) VALUES ((SELECT l_id FROM lokasjon WHERE lokasjon=?), "på lager", (SELECT l_id FROM lokasjon WHERE lokasjon=?), ?)',
      [tilhører, lokasjon, type],
      (error, results) => {
        connection.query(
          'INSERT INTO sykkel (v_id, ramme, girsystem, størrelse_hjul, type) VALUES ((SELECT MAX(v_id) FROM vare),?,?,?,?)',
          [ramme, girsystem, størrelse_hjul, type],
          (error, results) => {
            if (error) return console.error(error);

            success(results);
          }
        );
      }
    );
  }
}

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
  leggTilBestilling(fra, til, henting, levering, mobilnummer, success) {
    connection.query(
      'insert into bestilling (fra, til, henting, levering, k_id, rabatt, status) values (?,?,(SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT l_id FROM lokasjon WHERE lokasjon=?), (SELECT k_id FROM kunde WHERE mobilnummer=?),"35","bestilt")',
      [fra, til, henting, levering, mobilnummer],
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
    connection.query('SELECT * FROM alle_varer WHERE alle_varer.v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentVarer(success) {
    connection.query('SELECT * FROM alle_varer', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentSykler(success) {
    connection.query('SELECT * FROM alle_sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyr(success) {
    connection.query('SELECT * FROM alt_utstyr', (error, results) => {
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

  hentVarerStatus(status, success) {
    connection.query('SELECT * FROM alle_varer WHERE status=?', [status], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class TypeStatusService {
  hentSyklerType(type, success) {
    connection.query('SELECT * FROM alle_sykler WHERE alle_sykler.type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  hentUtstyrType(type, success) {
    connection.query('SELECT * FROM alt_utstyr WHERE alt_utstyr.type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
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
