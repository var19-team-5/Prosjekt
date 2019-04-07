import { connection } from './../../mysql_connection';

class s_Statuser {
  Bestilt(v_id, b_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('update bestilling set status ="bestilt" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Utlevert(v_id, b_id, success) {
    connection.query('update vare set status ="utleid" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('update bestilling set status ="levert ut" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Ferdig(v_id, b_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('update bestilling set status ="ferdig" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Transport(v_id, b_id, success) {
    connection.query('update vare set status ="transporteres" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('update bestilling set status ="transporteres" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Savnet(v_id, b_id, success) {
    connection.query('update bestilling set status ="savnet" where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('update vare set status ="savnet" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Slett {
  Bestilling(b_id, success) {
    connection.query('delete from utleieliste where b_id=?', [b_id], (error, results) => {
      connection.query('delete from bestilling where b_id=?', [b_id], (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
    });
  }
}

class s_Bestilling {
  Bestillinger(success) {
    connection.query('select * from alle_bestillinger', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SokNavn(navn, success) {
    connection.query('SELECT * FROM alle_bestillinger WHERE navn LIKE ?', ['%' + navn + '%'], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  InfoBestilling(b_id, success) {
    connection.query('select * from alle_bestillinger where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  InfoBestillingVarer(b_id, success) {
    connection.query('select * from bestillinger_varer where b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_statuser = new s_Statuser();
export let s_slett = new s_Slett();
export let s_bestilling = new s_Bestilling();
