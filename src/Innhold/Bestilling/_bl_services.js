import { connection } from './../../mysql_connection';

class s_Statuser {
  Bestilt(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="på lager" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="bestilt" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Utlevert(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="utleid" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="levert ut" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Ferdig(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="på lager" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="ferdig" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Transport(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="transporteres" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="transporteres" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Savnet(v_id, b_id, success) {
    connection.query('UPDATE bestilling set status ="savnet" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE vare set status ="savnet" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Slett {
  Bestilling(b_id, success) {
    connection.query('delete FROM utleieliste WHERE b_id=?', [b_id], (error, results) => {
      connection.query('delete FROM bestilling WHERE b_id=?', [b_id], (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
    });
  }
}

class s_Bestilling {
  Bestillinger(success) {
    connection.query('SELECT * FROM alle_bestillinger ORDER BY ABS( DATEDIFF( fra, NOW() ) )', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SokNavn(navn, success) {
    connection.query(
      'SELECT * FROM alle_bestillinger WHERE navn LIKE ? ORDER BY ABS( DATEDIFF( fra, NOW() ) )',
      ['%' + navn + '%'],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  InfoBestilling(b_id, success) {
    connection.query('SELECT * FROM alle_bestillinger WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  InfoBestillingVarer(b_id, success) {
    connection.query('SELECT * FROM bestillinger_varer WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_statuser = new s_Statuser();
export let s_slett = new s_Slett();
export let s_bestilling = new s_Bestilling();
