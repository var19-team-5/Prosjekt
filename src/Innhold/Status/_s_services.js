import { connection } from './../../mysql_connection';

class s_Nav {
  BrukteStatuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
class s_Sok {
  Vare(v_id, success) {
    connection.query('SELECT * FROM alle_varer WHERE alle_varer.v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Status {
  VarerStatus(status, success) {
    connection.query('SELECT * FROM alle_varer WHERE status=?', [status], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  PåLager(v_id, success) {
    connection.query('update vare set status ="på lager" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  TrengerReperasjon(v_id, success) {
    connection.query('update vare set status ="trenger reperasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  PåReperasjon(v_id, success) {
    connection.query('update vare set status ="på reperasjon" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  Savnet(v_id, success) {
    connection.query('update vare set status ="savnet" where v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class s_Slett {
  Vare(v_id, success) {
    connection.query('delete from sykkel where v_id=?', [v_id], (error, results) => {
      connection.query('delete from vare where v_id=?', [v_id], (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
    });
  }
}
class s_Varer {
  AlleVarer(success) {
    connection.query('SELECT * FROM alle_varer ORDER BY `alle_varer`.`v_id` ASC', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
class s_Sykler {
  AlleSykler(success) {
    connection.query('SELECT * FROM alle_sykler', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  SyklerType(type, success) {
    connection.query('SELECT * FROM alle_sykler WHERE alle_sykler.type=?', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
class s_Utstyr {
  AltUtstyr(success) {
    connection.query('SELECT * FROM alt_utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  UtstyrType(type, success) {
    connection.query('SELECT * FROM alt_utstyr WHERE alt_utstyr.type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_nav = new s_Nav();
export let s_sok = new s_Sok();
export let s_status = new s_Status();
export let s_slett = new s_Slett();
export let s_varer = new s_Varer();
export let s_sykler = new s_Sykler();
export let s_utstyr = new s_Utstyr();
